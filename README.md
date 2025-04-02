# Config Generator

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge) ![Documentation](https://img.shields.io/badge/Documentation-Yes-brightgreen?style=for-the-badge) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Ruby](https://img.shields.io/badge/Ruby-CC342D?style=for-the-badge&logo=ruby&logoColor=white)

A general configuration generator tool that leverages Nunjucks templating to create configuration files from templates and data sources.

## About

This project provides a simple yet powerful way to generate configuration files using templates. It uses Nunjucks (a JavaScript templating engine inspired by Jinja2) to render templates with data from YAML files.

## Features

- Template-based configuration generation
- YAML data source support
- Flexible output options
- Simple Node.js implementation

## Technologies Used

* [Node.js](https://nodejs.org/en/docs/) - JavaScript runtime
* [Nunjucks](https://mozilla.github.io/nunjucks/) - Templating engine (JavaScript implementation similar to Jinja2)
* [js-yaml](https://github.com/nodeca/js-yaml) - YAML parsing for Node.js
* [fs-extra](https://github.com/jprichardson/node-fs-extra) - Enhanced file system operations

## Project Structure

```
.
├── app.js              # Main application file
├── package.json        # Node.js dependencies and project metadata
├── sites.yml           # Site-specific configuration data
├── values.yml          # General values for template rendering
└── templates/          # Template directory
    └── nginx.rb.j2     # Nginx configuration template
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/config-generator.git
   cd config-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```



## Architecture

For detailed architecture documentation, see [ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Usage

1. Define your data in the YAML files (`sites.yml` and `values.yml`)
2. Create or modify templates in the `templates` directory using Nunjucks/Jinja2 syntax
3. Run the application:
   ```bash
   node app.js
   ```

## Template Example

Templates use the Nunjucks syntax (similar to Jinja2). Here's a simple example:

```jinja
server {
    listen 80;
    server_name {{ domain }};
    
    location / {
        proxy_pass {{ proxy_url }};
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Data Structure

The application uses two main YAML files:

1. `sites.yml` - Contains site-specific configuration
2. `values.yml` - Contains general values used across templates

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the terms included in the [LICENSE](LICENSE) file.

---
_This documentation was generated using AI analysis and may contain inaccuracies. Please verify critical information._