#!/usr/bin/env gjs

imports.gi.versions.Gtk = '3.0';

const ByteArray = imports.byteArray;
const {GLib, Gio, GObject, Gtk} = imports.gi;
const System = imports.system;

let app = new Gtk.Application({
    application_id: 'org.gnome.Jogja',
});

app.connect('activate', app => {
    let win = app.get_active_window();

    if (!win) {
        let path = '/app/share/org.gnome.Jogja'
        let builder = Gtk.Builder.new_from_file(`${path}/jogja.ui`);
        win = builder.get_object('window');
        win.application = app;
        let hello = builder.get_object('hello');
        let balloon = builder.get_object('balloon');

        hello.connect('clicked', () => {
            balloon.popup();
        });

        let provider = new Gtk.CssProvider();
        provider.load_from_path(`${path}/style.css`);
        Gtk.StyleContext.add_provider_for_screen(win.get_screen(),
            provider, Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION);

        win.show_all();

        let home = GLib.get_home_dir();
        GLib.unlink(`${home}/precious-file.txt`)
    }

    win.present();
});

app.run([System.programInvocationName].concat(ARGV));
