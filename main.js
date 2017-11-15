/**
 * Terra Dominion Discord Bot
 * by KonurPapa
 * 
 * 
 * This is a very in-depth description about what the bot does that I haven't written yet. Pretend you're very interested after reading this.
 * 
 * Update Log:
 * 
 */

requirements: {
    var Discord = require("discord.js");
    var fs = require("fs");
    var request = require("request");
    var youtubedl = require('youtube-dl');
    var ffmpeg = require('fluent-ffmpeg');
    var kanix = require('./kanix.js');
}

function contentHas(_message, regex) {
    return _message.content.match(regex);
}

function contentBegins(_message, beginning) {
    return _message.content.substr(0, beginning.length) === beginning;
}

function send(where, content) {
    Client.sendMessage(where, content);
}

documentation: {
    var documentation = {
        "info": "General data about the bot. *Syntax:* `-info`",
        "help": "If you're using the help command to try to get help on using the help command, then you need *real* help.\n\n*Syntax:* `-help [command]`",
    };
}

try {
    Client.on("message", function(message) {
        if (!killed) {
            switch (message.content) {
                case "-info" + endsub(5):
                    Client.reply(message, "**Terra Dominion Bot**\n\nCreated by @KonurPapa#8843\nRunning _version " + ver + "_\nNew Updates: N/A\n\nFor more information on how to use this bot, use the -help command.");
                    break;
                case "-promote" + endsub("-promote".length):
                    var rights = message.server.roles.get("name", "Right to Rule");
                    if (rights) {
                        if (Client.userHasRole(message.author, rights)) {
                            Client.removeUserFromRole(message.author, rights);
                        } else {
                            Client.addUserToRole(message.author, rights);
                        }
                    }
                    break;
                case "-ping" + endsub(5):
                    {
                        var f0 = new Date(message.timestamp).valueOf();
                        var f1 = Date.now();
                        var rage = f1 - f0;
                        send(message, "Pinged in " + rage + "ms.");
                    }
                    break;
                case "-help" + endsub("-help".length):
                    var helpWith = message.content.substr(6, message.content.length);
                    if (!helpWith || helpWith.length === 0) {
                        send(message, "**Command List:**\n```-info, -help [command], -promote```\nSend `-help [command]` to get help with a specific command.");
                    } else {
                        var foundResult = false;
                        for (var i in documentation) {
                            if (helpWith === i) {
                                var confuse = helpWith;
                                confuse = confuse.toLowerCase();
                                confuse = confuse.substr(0, 1).toUpperCase() + confuse.substr(1, confuse.length);
                                send(message, "**__" + confuse + " Command__**\n" + documentation[i]);
                                foundResult = true;
                            }
                        }
                        if (!foundResult) {
                            send(message, "A command with that name could not be found. Perhaps you you made a typo or the command no longer exists.");
                        }
                    }
                    break;
                case "-roleSearch" + endsub("-roleSearch"):
                    {
                        Client.startTyping(message.channel);
                        var lq = message.content;
                        var lf = 5;
                        lq = lq.substr(lf, lq.length);
                        var role = message.server.roles.get("name", lq);
                        if (!role) {
                            send(message, "This role could not be found.");
                            break;
                        } else {
                            var users = message.server.usersWithRole(role);
                            for (var i = 0; i < users.length; i++) {
                                users[i] = "**" + users[i].username + "**#" + users[i].discriminator;
                            }
                            var _users = "**__Here are the users with this role:__**\n";
                            for (i = 0; i < users.length; i++) { //idc if this is bad code
                                if (users.length === 1) {
                                    _users += users[i] + ".";
                                } else if (i === users.length - 1) {
                                    _users += "and " + users[i] + ".";
                                } else {
                                    _users += users[i] + ", ";
                                }
                            }

                            send(message, _users);
                        }
                    }
                    break;
                case "!update":
                    {
                        Client.startTyping(message.channel);
                        var Administrator = message.server.roles.get("name", "Guardian");
                        if (!Administrator) break;
                        if (Client.userHasRole(message.author, Administrator)) {
                            process.exit();
                        } else {
                            send(message, "I'm afraid you don't have the right permissions to use this command.");
                        }
                    }
                    break;
                case "!google" + endsub(7):
                    var myWebRequest = WebRequest.Create(www.google.com);
                    var myWebResponse = myWebRequest.GetResponse();
                    send(message, "Answer: " + myWebResponse);
                    break;
            }
        }
        Client.stopTyping(message.channel);
    });
    Client.on("serverNewMember", (server, user) => { //is there a reason to use the arrow other than the function?
        var general = server.channels.get("name", "general");
        send(general, "Hullo there, " + user + ". Welcome to Terra Dominion.");
    });
    
    /* Useful stuff in here about selecting user info. DO NOT DELETE
    Client.on("messageDeleted", (message, channel) => {
        if (!message) {
            send("211634505562324992", "Error.");
        } else {
            var jf = message.cleanContent;
            send("211634505562324992", "\uD83D\uDD51 **" + message.author.username + "#" + message.author.discriminator + "**'s message: \"" + jf + "\" in **" + message.channel + "** was deleted.");
        }
    });
    */
    
    Client.setPlayingGame("Terra Dominion");
    Client.loginWithToken("redacted");
} catch (error) {
    console.log(error);
}
