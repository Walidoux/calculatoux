# Calculatoux

## Inspirations

- [Calculator Animations Example](https://dribbble.com/shots/2610388-Simple-calculator-animation)

## Resources

- [Typesafety in TS using Rust commands](https://github.com/oscartbeaumont/tauri-specta)
- [Rust Grammar Calculator](https://github.com/lalrpop/lalrpop)

## Blur and vibrancy window

### Linux user systems

Thanks to [mutter-rounded](https://github.com/yilozt/mutter-rounded) which makes it possible to add vibrancy over windows. Mutter is a wayland display server and X11 window manager and compositor library.

#### gnome-shell

- Installation: follow the [Instructions](https://github.com/yilozt/mutter-rounded#readme) depending on your linux distro.

- After installing `mutter-rounded` and the package of the app in the releases page, open your terminal and execute:

```bash
gsettings set org.gnome.mutter blur-list "['calculatoux']"
```

This will whitelist the app window to trigger the blur effect.
On top of that, you can have the same effect for other windows such as your terminal by whitelisting them. And in order to figure out the name of the window, execute this:

```bash
xprop | grep WM_CLASS
```

Your cursor will be changed so you can select the window of your choice, and this will prompt the name of your window. You might want to get the first one if you have mutliple names.

**Issue with Compiz Windows Effect**: This gnome extension doesn't apply for blurry windows, it has a weird effect when dragging and moving the window.

#### Other desktop environments

⚠️ Blurry backgrounds and rounded edges is only supported in gnome-shell due to the diversity of shell environments in linux based systems. And It is, **for now**, better to sick around to what most linux users have on their machine.
Feel free to open either a PR/issue so we can make things work together!

### Windows / MacOS
