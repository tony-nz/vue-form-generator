import type FormTypes from "./FormConfigTypes";

const newLocal = "Advanced settings for the user";
export const form: Array<FormTypes> = [
  {
    type: "tab",
    name: "Tab 1",
    // type: "step",
    children: [
      {
        label: "General",
        class: "col-span-6",
        description: newLocal,
        fields: [
          {
            type: "text",
            label: "Given Name",
            placeholder: "John",
            id: "givenName",
            required: true,
            class: "col-span-6",
          },
          {
            type: "text",
            label: "Family Name",
            placeholder: "Smith",
            id: "familyName",
            required: true,
            class: "col-span-6",
          },
          {
            type: "text",
            label: "Full Name",
            placeholder: "John Smith",
            id: "fullName",
            required: true,
          },
          {
            type: "select",
            label: "Gender",
            id: "gender",
            options: [
              { name: "Female", id: "female" },
              { name: "Male", id: "male" },
            ],
            required: true,
          },
          {
            type: "text",
            label: "Primary Email",
            placeholder: "john@gmail.com",
            id: "primaryEmail",
            required: true,
          },
          {
            type: "text",
            label: "Recovery Email",
            placeholder: "john.smith@gmail.com",
            id: "recoveryEmail",
            required: true,
          },
          {
            type: "text",
            label: "Recovery Phone",
            placeholder: "021 503 088",
            id: "recoveryPhone",
            required: true,
          },
        ],
      },
      {
        label: "Advanced",
        description: newLocal,
        class: "col-span-6",
        fields: [
          {
            type: "select",
            label: "Organization",
            id: "orgUnitPath",
            description: "Please select a organization...",
            required: true,
            optionsUrl: "/api/sms/google/organization",
            optionValue: "orgUnitPath",
            optionsLabel: "orgUnitPath",
          },
          {
            type: "switch",
            label: "Archived",
            id: "archived",
            options: ["true", "false"],
            required: true,
          },
          {
            type: "switch",
            label: "Is Admin",
            id: "isAdmin",
            options: ["true", "false"],
            required: true,
          },
          {
            type: "switch",
            label: "Include In Global Address List",
            id: "includeInGlobalAddressList",
            options: ["true", "false"],
            required: true,
          },
          {
            type: "switch",
            label: "Change Password At Next Login",
            id: "changePasswordAtNextLogin",
            options: ["true", "false"],
            required: true,
          },
          {
            type: "switch",
            label: "Suspended",
            id: "suspended",
            options: ["true", "false"],
            required: true,
          },
          {
            type: "text",
            label: "Suspended Reason",
            placeholder: "E.g. user no longer at organization",
            id: "suspendedReason",
            required: false,
            conditional: {
              field: "suspended",
              value: 1, // true
            },
          },
        ],
      },
    ],
  },
];
