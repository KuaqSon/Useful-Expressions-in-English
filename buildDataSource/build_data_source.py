import requests
from bs4 import BeautifulSoup
import json


BASE_URL = "https://www.ihbristol.com"
EXPRESSIONS_URL = "https://www.ihbristol.com/useful-english-expressions"


def buildData():
    blocks = []
    r = requests.get(EXPRESSIONS_URL)
    if r.status_code == 404 or r.text is None:
        print("")
        raise Exception(f"No content at {EXPRESSIONS_URL}")

    html = BeautifulSoup(r.text, "html.parser")
    block_views = html.find_all("section", "block-views")
    for block_view in block_views:
        level = block_view.find("h2").text
        rows = block_view.find_all("h3")
        for row in rows:
            header = row.find("a").text
            href = f"""{BASE_URL}{row.find("a")["href"]}"""
            sub_page = requests.get(href)
            if sub_page.status_code == 404 or sub_page.text is None:
                print("")
                raise Exception(f"No content at sub page: {href}")

            sub_html = BeautifulSoup(sub_page.text, "html.parser")
            sumary = sub_html.select_one("div[property='content:encoded'] > p").text

            print("")
            print(sumary)

            expressions = []
            expression_blocks = sub_html.select(
                ".node-useful-expressions > div:nth-child(2) > div:nth-child(1) li"
            )
            for idx, expression_block in enumerate(expression_blocks):
                expressions.append(f"""{idx + 1}. {expression_block.text}""")

            howtouses = []
            howtouse_blocks = sub_html.select(
                ".node-useful-expressions > div:nth-child(2) > div:nth-child(2) li"
            )
            for howtouse_block in howtouse_blocks:
                howtouses.append(howtouse_block.text)

            normalize = f"{level} {header} {sumary} {' '.join(expressions)} {' '.join(howtouses)}".lower()
            normalize = " ".join(filter(str.isalnum, normalize.split()))

            blocks.append(
                {
                    "level": level,
                    "header": header,
                    "sumary": sumary,
                    "expressions": expressions,
                    "howtouses": howtouses,
                    "normalize": normalize,
                }
            )

    print(blocks)
    with open("../app/src/data.json", "w") as f:
        json.dump(blocks, f)


def process():
    try:
        buildData()
    except Exception as e:
        print(e)
        print("Build data failed!!")


process()