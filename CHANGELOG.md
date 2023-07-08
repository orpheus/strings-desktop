# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [UNRELEASED]

## [1.0.0] - 2023-07-07

### Notes
- tagging and releasing app as is -- have been using for a year with great success

## [0.1.1] - 2022-07-17

### Fixed
- string was using .order as an ordering index instead of .index
  - was causing problems after deleting. still possible .index bugs
- Styles
  - overflow text now shows as a big block instead of coming outside the row borders
  - adding margin-bottom to StringField so that there was room to see the bottom string
  - standardized box-sizings on the main containers to be the same height (thread row, string row, stringfield)

### Added
- localStorage persistence of the activeThread

## [0.1.0] - 2022-07-14

### Added
- 0.1.0 brings thread and string creation with a drag and drop prioritize-able interface. 

## [2022-07-13]
### Added
- UI Design

### Fixed
- bug in drag n drop handler where it wasn't getting the most recent string data state 

## [2022-07-12]
### Added
- delete string w/ api
- update string name w/ api
- save order of strings on drag n drop w/ api

### Changed
- Removed the `threadStringMap` and using the query data directly with `refetch`

## [2022-07-11]

### Added
- create/fetch strings from backend

## [2022-07-10]

### Added
- create/delete/fetch threads via backend

### Changed
- commented out code as I switch to using a persistent backend

## [2022-07-05]

### Added
- static: update string name
- static: delete string

## [2022-07-02]

### Added
- static: create/delete threads
- static: create strings under threads
- static: drag and drop strings


[Unreleased]: https://github.com/orpheus/strings-desktop/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/orpheus/strings-desktop/releases/tag/v1.0.0
