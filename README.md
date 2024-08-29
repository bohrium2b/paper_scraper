# Paper Scraper

Downloads papers from Papacambridge.

## Getting started

Install python >= 3.10, and poetry (`pip install poetry`).

Then, install the project dependencies using `poetry install`, and enter the poetry shell using `poetry shell`.

## Usage

```
usage: python crawl.py [-h] [--directory DIRECTORY] [--report] format

Crawl CAIE past papers from a URL

positional arguments:
  format                Path to the JSON format file

options:
  -h, --help            show this help message and exit
  --directory DIRECTORY
                        Directory to save the papers in
  --report              Generate a report from existing download
```

## Examples

```
$ python crawl.py format_9709.json # Puts all files in 9709/
$ python crawl.py format_9709.json --directory maths/ # Puts all files in maths/
$ python crawl.py format_9709.json --directory 9709/ --report # Looks for format_9709, and the directory 9709 to generate a report (in 9709/report.html)
```
