import { Link } from "lucide-react";
import {
    SiInstagram, SiFacebook, SiGithub, SiYoutube, SiTiktok, SiReddit, SiPinterest, SiSnapchat, SiTumblr, SiDiscord,  SiTelegram, SiMastodon, SiFlickr, SiVimeo, SiMedium, SiDribbble, SiBehance, SiSoundcloud,
    SiX
} from "@icons-pack/react-simple-icons";

const socialToIcon = {
    instagram: SiInstagram,
    facebook: SiFacebook,
    twitter: SiX,
    github: SiGithub,
    Youtube: SiYoutube,
    tiktok: SiTiktok,
    reddit: SiReddit,
    pinterest: SiPinterest,
    snapchat: SiSnapchat,
    tumblr: SiTumblr,
    discord: SiDiscord,
    telegram: SiTelegram,
    mastodon: SiMastodon,
    flickr: SiFlickr,
    vimeo: SiVimeo,
    medium: SiMedium,
    dribbble: SiDribbble,
    behance: SiBehance,
    soundcloud: SiSoundcloud,
    link: Link,


} as const; 

export type SocialMediaPlatform = keyof typeof socialToIcon;

export function getSocialIcon(platform: SocialMediaPlatform) {
    return socialToIcon[platform] || Link;
}

export default socialToIcon