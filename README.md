# Database Concepts for Industrial Engineers, published site

This repository exists to **host** the book by Manuel D. Rossetti. It holds no
sources.

The site is served by GitHub Pages from the [`docs/`](docs/) folder on `main`:

**<https://rossetti.github.io/DbConceptsBook/>**

The book's companion code (SQL scripts, data, and Kotlin examples) is in its
own repository: <https://github.com/rossetti/DbConceptsBookCode>.

## Where the sources are

The book is written in a private source repository, which holds the Quarto
sources and the instructor-only material and builds the student edition. Only
the student build is ever copied here.

## How content arrives

Nothing in `docs/` is edited by hand. It is mirrored from the student render by
`scripts/publish.sh` in the source repository, which refuses to copy a build
that fails its check for instructor-only content, mirrors with `--delete` so
that `docs/` matches the build exactly, and keeps `.nojekyll`. Then the release
is committed and pushed here.

## Do not delete `docs/.nojekyll`

Quarto writes its assets into `site_libs/` and `*_files/`. GitHub Pages runs
Jekyll by default, and Jekyll hides directories whose names begin with an
underscore. Without `.nojekyll` the pages load with no styling and no search.

## Pages configuration

Settings, Pages: *Deploy from a branch*, branch `main`, folder `/docs`.

## License

The text is licensed under
[CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/).
