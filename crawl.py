import json
import os
from typing import Dict, Literal, TypedDict
from argparse import ArgumentParser

# from bs4 import BeautifulSoup
from requests import get
from jinja2 import Environment, FileSystemLoader, select_autoescape
from rich.console import Console
from rich.progress import Progress

jinjaenvironment = Environment(
    loader=FileSystemLoader("."),
    autoescape=select_autoescape(["html", "xml"])
)


console = Console()
print = console.print

class PaperName(TypedDict):
    code: int | str
    year: int
    season: Literal["s", "w"]
    papertype: Literal["ms", "qp"]
    paper: int
    variant: Literal[1, 2, 3]
    filename: str

class Component(TypedDict):
    name: str
    paper: int
    papers: list[PaperName]
    duration: str
    total_marks: int

def initcrawl(formatraw: str, directory:str = None):
    scrapeconfig = json.loads(formatraw)
    url = scrapeconfig["urldata"]["url"]
    useragent = scrapeconfig["urldata"]["user-agent"]
    directory = scrapeconfig["code"] if directory is None else directory
    if not os.path.exists(directory):
        os.makedirs(str(directory))
    papers: list[PaperName] = [
        {
            "code": scrapeconfig['code'],
            "year": year,
            "season": season,
            "papertype": papertype,
            "paper": paper,
            "variant": variant
        }
        for year in range(scrapeconfig['yearstart'], scrapeconfig['yearend'] + 1)
        for season in ["s", "w"]
        for papertype in ["ms", "qp"]
        for paper in [component.get("paper") for component in scrapeconfig['info']['components']]
        for variant in [1, 2, 3]
    ]
    successful_papers: list[PaperName] = []
    with Progress() as progress:
        task = progress.add_task("Downloading papers...", total=len(papers))
        for index, paper in enumerate(papers):
            paperurl = f"{paper['code']}_{paper['season']}{paper['year']:2d}_{paper['papertype']}_{paper['paper']}{paper['variant']}.pdf"
            print(f"Downloading {paper}...\t", end="")
            response = get(f"{url}{paperurl}", headers={'User-Agent': useragent})
            if response.status_code != 200:
                progress.console.log(f"Failed to download {paperurl}!")
                progress.update(task, advance=1)
                continue
            if "<!DOCTYPE html>" in response.text:
                progress.console.log(f"Failed to download {paperurl}!")
                progress.update(task, advance=1)
                continue
            if os.path.exists(f"{directory}/{paperurl}"):
                progress.console.log(f"File {paperurl} already exists!")
                progress.update(task, advance=1)
                continue
            with open(f"{directory}/{paperurl}", "wb") as file:
                file.write(response.content)
            progress.console.log(f"Downloaded {paperurl}!")
            successful_papers.append({**paper, "filename": f"{paperurl}"})
            progress.update(task, advance=1)
    print(f"Successfully downloaded {len(successful_papers)} papers!")
    # Parse successful papers into a list
    with open(f"{directory}/papers.json", "w") as file:
        json.dump(successful_papers, file)
    print("Saved paper list to papers.json!")
    componentpapers = []
    for component in scrapeconfig['info']['components']:
        finalcomponent: Component = {
            "name": component["name"],
            "paper": component["paper"],
            "papers": [],
            "duration": component["duration"],
            "total_marks": component["total_marks"]
        }
        for paper in successful_papers:
            if paper["paper"] == component["paper"]:
                finalcomponent["papers"].append(paper)
        componentpapers.append(finalcomponent)
    with open(f"{directory}/components.json", "w") as file:
        json.dump(componentpapers, file)
    print("Saved component list to components.json!")
    generate_report(successful_papers, scrapeconfig, directory, componentpapers)
    print("Download complete!")
            

def generate_report(successful_papers: list[PaperName], scrapeconfig: Dict, directory: str, componentpapers: list[Component], papers: list[PaperName] = None):
    template = jinjaenvironment.get_template("report.html")
    with open(f"{directory}/report.html", "w") as file:
        file.write(template.render(components=componentpapers, code=scrapeconfig["code"], num_successful=len(successful_papers), num_failed=(len(papers) - len(successful_papers) if papers else "N/A"), year_start=scrapeconfig["yearstart"], year_end=scrapeconfig["yearend"]))


def main():
    parser = ArgumentParser(description="Crawl CAIE past papers from a URL", prog="crawl")
    parser.add_argument("format", help="Path to the JSON format file")
    parser.add_argument("--directory", help="Directory to save the papers in", default=None)
    parser.add_argument("--report", help="Generate a report from existing download", action="store_true")
    args = parser.parse_args()
    if not os.path.exists(args.format):
        console.log("[red bold]Error: Format file does not exist![/red bold]")
        return
    with open(args.format, "r") as file:
        formatraw = file.read()
    
    if args.report:
        if not os.path.exists(f"{args.directory}/papers.json") or not os.path.exists(f"{args.directory}/components.json"):
            console.log("[red bold]Error: papers.json or components.json not found![/red bold]")
            return
        with open(f"{args.directory}/papers.json", "r") as file:
            papers = json.load(file)
        with open(f"{args.directory}/components.json", "r") as file:
            components = json.load(file)
        generate_report(papers, json.loads(formatraw), args.directory, components)
    else:
        initcrawl(formatraw, args.directory)


if __name__ == '__main__':
    main()