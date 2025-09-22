# 📍 Marker

A simple yet powerful command-line tool for managing directory navigation by setting bookmarks (marks) to frequently used folders.

## 🚀 Features

- **Quick Directory Marking**: Bookmark any directory with a memorable name
- **Fast Navigation**: Instantly retrieve full paths to your marked directories
- **Beautiful CLI Output**: Colorful and intuitive command-line interface
- **TypeScript**: Written in modern TypeScript for reliability and performance
- **Lightweight**: Minimal dependencies, fast startup

## 📦 Installation

### From npm

```bash
npm install -g @thenovatasha/marker
```

### From source

```bash
git clone https://github.com/thenovatasha/marker.git
cd marker
npm install
npm run build
npm link
```
## 🔧 Shell Integration

For even faster navigation, you can create shell aliases or functions:

### Bash/Zsh

Add to your `~/.bashrc` or `~/.zshrc`:

```bash
# Quick navigation to marks
goto() {
    local path=$(marker get "$1" 2>/dev/null)
    if [ $? -eq 0 ]; then
        cd "$path"
    else
        echo "Mark '$1' not found"
        return 1
    fi
}
```

Usage:
```bash
marker mark work   # Mark current directory as 'work'
goto work          # Navigate to 'work' mark
```

### Fish Shell

Add to your `~/.config/fish/config.fish`:

```fish
function goto
    set path (marker get $argv[1] 2>/dev/null)
    if test $status -eq 0
        cd $path
    else
        echo "Mark '$argv[1]' not found"
        return 1
    end
end
```


## 🔧 Usage

### Mark a directory

Mark the current directory with a memorable name:

```bash
marker mark work
# ✓ Mark 'work' created successfully
#   → /home/user/projects/work-stuff
```

Replace an existing mark:

```bash
marker mark work --replace
# ✓ Mark 'work' updated successfully
#   → /home/user/new-work-location
```

### List all marks

View all your saved directory marks:

```bash
marker ls
# 📍 Found 3 marks:
#
#   work → /home/user/projects/work-stuff
#   docs → /home/user/documents
#   temp → /tmp/scratch
```


### Remove a mark

Delete a bookmark when you no longer need it:

```bash
marker rm work
# ✓ Deleted mark 'work'
#   Path was: /home/user/projects/work-stuff
```

### Get a mark's path

Retrieve the full path to a marked directory:

```bash
marker get work
# /home/user/projects/work-stuff
```
This is particularly useful for shell navigation:

```bash
cd $(marker get work)
# or
cd `marker get work`
```

## 📋 Commands

| Command | Description | Options |
|---------|-------------|---------|
| `marker mark <name>` | Mark the current directory | `--replace, -r` - Overwrite existing mark |
| `marker ls` | List all marks | |
| `marker get <name>` | Get the full path to a mark | |
| `marker rm <name>` | Remove a mark | |



## 🛠️ Development

### Prerequisites

- Node.js 18+
- TypeScript

### Setup

```bash
git clone https://github.com/thenovatasha/marker.git
cd marker
npm install
```

### Build

```bash
npm run build
```

### Local Testing

```bash
npm link
marker --help
```

## 📝 License

ISC License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💡 Ideas for Enhancement

- Import/export marks to/from files
- Cloud synchronization across machines
- Mark categories and tags
- Auto-completion for mark names
- Integration with popular file managers
---

Made with ❤️ by  [Nova Tasha](https://github.com/thenovatasha)
