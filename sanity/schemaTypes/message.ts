import { defineType, defineField } from "sanity";
import {MailPlus} from "lucide-react"


export default defineType({
    name: "message",
    title: "VIP Messages",
    type: "document",
    icon: MailPlus,
    description: "Messages sent by VIP members to the creator",
    preview:{
        select:{
            message: "messageBody",
            sender: "sender.name",
            date: "_createdAt",
        },
        prepare({message, sender, date}) {
                return{
                    title: message,
                    subtitle: `From: ${sender || "Unknown"} - ${date ? new Date(date).toLocaleDateString(): "Unkown date"}`,
                }
    },
 
    },
fields:[
    defineField({
        name: "senderName",
        title: "Sender Name",
        type: "string",
        description: "Name of the sender (VIP member)",
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name:"senderEmail",
        title: "Sender Email",
        type: "string",
        description: "Email of the sender (VIP member)",
        validation: (Rule) => Rule.required(),
        
    }),
    defineField({
        name: "messageBody",
        title: "Message Body",
        type: "text",
        description: "Content of the message sent by the VIP member",
        validation: (Rule) => Rule.required().min(10).max(500),
    }),
    defineField({
        name: "isRead",
        title: "Read",
        type: "boolean",
        description: "Has the creator read this message?",
    })
]
})