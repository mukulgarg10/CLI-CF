# CF-CLI

CF-CLI is a command line tool implemented in Node JS to provide almost all functionalities with your terminal. Currently, support is for Linux environment.

## Installation

- Install Node JS
- Download this repository
- Open terminal in the downloaded directory
- Run the settings.sh script 

```bash
bash settings.sh
```

## Usage

Currently cf-cli can perform the following tasks

```bash
shivansh@shivanshm:~/ed/CF-cli$ cf-cli
Usage: cf-cli [options] [command]

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  credentials     Manage CF login credentials
  login           Attempt Login
  logout          Logout from CF
  compiler        Manage compiler details
  submit          Attempt a submission
  status          View your submission stats
  help [command]  display help for command
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Coming Soon
- See rating graphs directly from terminal
- Add or remove friends

## License
[MIT](https://choosealicense.com/licenses/mit/)