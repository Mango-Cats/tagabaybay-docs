#!/usr/bin/env python3
"""Remove all LaTeX auxiliary/compiler files. Works on Windows and Linux."""

import glob
import os
import sys

MAIN = "main"

AUX_EXTS = [
    "aux", "bbl", "bcf", "blg", "fdb_latexmk", "fls",
    "log", "lof", "lot", "out", "run.xml", "synctex.gz",
    "toc", "nav", "snm", "vrb", "idx", "ilg", "ind",
]

SUB_AUX_DIRS = ["chapters", "frontmatter", "appendices"]


def clean(remove_pdf=False):
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    removed = []

    for ext in AUX_EXTS:
        path = f"{MAIN}.{ext}"
        if os.path.exists(path):
            os.remove(path)
            removed.append(path)

    for d in SUB_AUX_DIRS:
        for path in glob.glob(os.path.join(d, "**", "*.aux"), recursive=True):
            os.remove(path)
            removed.append(path)

    if remove_pdf and os.path.exists(f"{MAIN}.pdf"):
        os.remove(f"{MAIN}.pdf")
        removed.append(f"{MAIN}.pdf")

    if removed:
        for f in removed:
            print(f"  removed {f}")
        print(f"\nCleaned {len(removed)} file(s)")
    else:
        print("Nothing to clean")


if __name__ == "__main__":
    remove_pdf = "--pdf" in sys.argv
    clean(remove_pdf)
