from setuptools import setup
import os

VERSION = "0.2.3"


def get_long_description():
    with open(
        os.path.join(os.path.dirname(os.path.abspath(__file__)), "README.md"),
        encoding="utf8",
    ) as fp:
        return fp.read()


setup(
    name="datasette-query-history",
    description="Datasette plugin that keeps a list of the queries you've run and lets you rerun them.",
    long_description=get_long_description(),
    long_description_content_type="text/markdown",
    author="Bret Walker",
    url="https://github.com/bretwalker/datasette-query-history",
    project_urls={
        "Issues": "https://github.com/bretwalker/datasette-query-history/issues",
        "CI": "https://github.com/bretwalker/datasette-query-history/actions",
        "Changelog": "https://github.com/bretwalker/datasette-query-history/releases",
    },
    license="Apache License, Version 2.0",
    version=VERSION,
    packages=["datasette_query_history"],
    entry_points={"datasette": ["query_history = datasette_query_history"]},
    package_data={"datasette_query_history": ["static/datasette-query-history.js", "static/datasette-query-history.css"]},
    install_requires=["datasette"],
    extras_require={"test": ["pytest", "pytest-asyncio"]},
    tests_require=["datasette-query-history[test]"],
    python_requires=">=3.6",
)
