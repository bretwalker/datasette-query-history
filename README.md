# datasette-query-history

[![PyPI](https://img.shields.io/pypi/v/datasette-query-history.svg)](https://pypi.org/project/datasette-query-history/)
[![Changelog](https://img.shields.io/github/v/release/bretwalker/datasette-query-history?include_prereleases&label=changelog)](https://github.com/bretwalker/datasette-query-history/releases)
[![Tests](https://github.com/bretwalker/datasette-query-history/workflows/Test/badge.svg)](https://github.com/bretwalker/datasette-query-history/actions?query=workflow%3ATest)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/bretwalker/datasette-query-history/blob/main/LICENSE)

Datasette plugin that keeps a list of the queries you've run and lets you rerun them.

## Installation

Install this plugin in the same environment as Datasette.

    $ datasette install datasette-query-history

## Usage

Click the `Query History` button on the SQL editor page to see previous queries.  
Click the ⬆︎ button to replace the current query with a previous query.  
Click the `Clear Query History` button to clear the list previous queries.

<img src="https://raw.githubusercontent.com/bretwalker/datasette-query-history/main/docs/datasette-query-history-example1.png" width="350px" alt="Screenshot of plugin">

## Development

To set up this plugin locally, first checkout the code. Then create a new virtual environment:

    cd datasette-query-history
    python3 -mvenv venv
    source venv/bin/activate

Or if you are using `pipenv`:

    pipenv shell

Now install the dependencies and tests:

    pip install -e '.[test]'

To run the tests:

    pytest
