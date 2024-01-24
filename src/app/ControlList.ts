export const htmlTabsData = [
  {
    label: "Heading here",
    children: [
      {
        label: "General",
        id: "general",
        children: [
          {
            label: "Button",
            id: "button",
            icon: "fa fa-chevron-down",
            children: [
              {
                parameter: "buttonGroup",
                icon: "uil uil-bitcoin-sign",
                label: "Actions Group",
                // treeExpandIcon: 'caret-right',
                // treeInExpandIcon: 'caret-down',
              },
              {
                parameter: "insertButton",
                icon: "uil uil-bitcoin-sign",
                label: "Insert Button",
                isLeaf: true
                // treeExpandIcon: 'caret-right',
                // treeInExpandIcon: 'caret-down',
              },
              {
                parameter: "updateButton",
                icon: "uil uil-bitcoin-sign",
                label: "Update Button",
                isLeaf: true
                // treeExpandIcon: 'caret-right',
                // treeInExpandIcon: 'caret-down',
              },
              {
                parameter: "deleteButton",
                icon: "uil uil-bitcoin-sign",
                label: "Delete Button",
                isLeaf: true
                // treeExpandIcon: 'caret-right',
                // treeInExpandIcon: 'caret-down',
              },
              {
                parameter: "dropdownButton",
                icon: "uil uil-bitcoin-sign",
                label: "Dropdown Menu",
                isLeaf: true
              },
              {
                parameter: "linkbutton",
                icon: "uil uil-bitcoin-sign",
                label: "Link Button",
                isLeaf: true
              },
              {
                parameter: "downloadButton",
                icon: "uil uil-bitcoin-sign",
                label: "Download Button",
                isLeaf: true
              },
            ]
          },
          {
            label: "Typography",
            id: "typography",
            icon: "fa fa-chevron-down",
            children: [
              {
                parameter: "heading",
                icon: "uil uil-text",
                label: "Heading",
                isLeaf: true
              },
              {
                parameter: "paragraph",
                icon: "uil uil-paragraph",
                label: "Paragraph",
                isLeaf: true
              },
            ]
          },
          {
            label: "Icon",
            id: "icon",
            icon: "fa fa-chevron-down",
            children: [
              {
                parameter: "icon",
                icon: "uil uil-text",
                label: "Icon",
                isLeaf: true
              },
            ]
          },
        ]
      },
      {
        label: "Layout",
        icon: "fa fa-chevron-down",
        id: "layout",
        children: [
          {
            label: "Basic",
            id: "basic",
            children: [
              // {
              //   parameter: "container",
              //   icon: "uil uil-file-alt",
              //   label: "Container"
              // },
              {
                parameter: "gridList",
                icon: "uil uil-file-alt",
                label: "List/Data Grid",
                isLeaf: true
              },
              {
                parameter: "invoiceGrid",
                icon: "uil uil-file-alt",
                label: "Invoice Grid",
                isLeaf: true
              },
              {
                parameter: "divider",
                icon: "uil uil-file-alt",
                label: "Divider",
                isLeaf: true
              },
              // {
              //   parameter: "gridListEditDelete",
              //   icon: "uil uil-file-alt",
              //   label: "List/Data Grid Editable"
              // },
              // {
              //   parameter: "invoiceGrid",
              //   icon: "uil uil-file-alt",
              //   label: "Invoice Grid"
              // },
              // {
              //   parameter: "table",
              //   icon: "uil uil-file-alt pr-1",
              //   label: "Table"
              // },
            ]
          },
        ]
      },
      {
        label: "Navigation",
        icon: "fa fa-chevron-down",
        id: "navigation",
        children: [
          {
            label: "Basic",
            id: "static-1",
            children: [
              {
                parameter: "affix",
                icon: "uil uil-file-alt",
                label: "Affix",
                isLeaf: true
              },
              // {
              //   parameter: "dropdownButton",
              //   icon: "uil uil-bitcoin-sign",
              //   label: "Dropdown Menu"
              // },
              {
                parameter: "stepperAddNew",
                icon: "uil-list-ul",
                label: "Stepper"
              },
            ]
          },
        ]
      },
      {
        label: "Data Entry",
        id: "data-entry",
        children: [
          {
            label: "Basic",
            id: "static-1",
            icon: "fa fa-chevron-down",
            children: [

              // {
              //   parameter: "cascader",
              //   icon: "uil-arrow-break",
              //   label: "Cascader",
              //   isLeaf: true
              // },
              {
                parameter: "input",
                icon: "uil-check-square",
                label: "Checkbox",
                type: 'checkbox',
                configType: 'checkbox',
                fieldType: 'checkbox',
                // maskString: "",
                // maskLabel: ""
                options: true,
              },
              {
                parameter: "mentions",
                icon: "uil-file-copy-alt",
                label: "Mention"
              },

              {
                parameter: "transfer",
                icon: "uil-sliders-v-alt",
                label: "Transfer"
              },
              {
                parameter: "treeSelect",
                icon: "uil-toggle-off",
                label: "Tree Select"
              },
              {
                parameter: "tree",
                icon: "uil-toggle-off",
                label: "Tree"
              },
              {
                parameter: "input",
                icon: "uil uil-file-alt",
                label: "Decimal",
                type: 'input',
                configType: 'decimal', fieldType: 'decimal',
                // maskString: "",
                // maskLabel: ""
              },
              {
                parameter: "input",
                icon: "uil uil-file-alt",
                label: "Email Input",
                type: 'email',
                configType: 'email', fieldType: 'email',
              },
              // {
              //   parameter: "input",
              //   icon: "uil uil-fast-mail",
              //   label: "Email",
              //   type: 'input',
              //   configType: 'input', fieldType: 'input',
              //   // maskString: "",
              //   // maskLabel: ""
              // },
              {
                parameter: "input",
                icon: "uil uil-text",
                label: "Input",
                type: 'input',
                configType: 'input', fieldType: 'input',
                treeExpandIcon: 'fa-regular fa-t',
                treeInExpandIcon: 'fa-regular fa-t',
                // maskString: "",
                // maskLabel: ""
              },
              // {
              //   parameter: "input",
              //   icon: "uil uil-text",
              //   label: "switch",
              //   type: 'switch',
              //   configType:'inputWrapper',fieldType: 'inputWrapper',
              //   // maskString: "",
              //   // maskLabel: ""
              // },
              // {
              //   parameter: "inputGroup",
              //   icon: "uil uil-text",
              //   label: "Input Group"
              // },
              // {
              //   parameter: "inputGroupGrid",
              //   icon: "uil uil-text",
              //   label: "Input Group Grid"
              // },
              {
                parameter: "switch",
                icon: "uil-toggle-off",
                label: "switch"
              },
              {
                parameter: "input",
                icon: "uil uil-list-ul",
                label: "Multi Select",
                type: 'multiselect',
                configType: 'multiselect', fieldType: 'multiselect',
                options: true,
                // maskString: "",
                // maskLabel: ""
              },
              {
                parameter: "input",
                icon: "uil uil-list-ul",
                label: "Autocomplete",
                type: 'autoComplete',
                configType: 'autoComplete', fieldType: 'autoComplete',
                options: true,
                // maskString: "",
                // maskLabel: ""
              },
              // {
              //   parameter: "input",
              //   icon: "uil uil-list-ul",
              //   label: "Mention",
              //   type: 'mention',
              //   configType:'mention',fieldType: 'mention',
              //   options:true,
              //   // maskString: "",
              //   // maskLabel: ""
              // },
              {
                parameter: "input",
                icon: "uil uil-file-alt",
                label: "number",
                type: 'number',
                configType: 'number', fieldType: 'number',
                // maskString: "",
              },
              {
                parameter: "input",
                icon: "uil uil-calender",
                label: "Cascader",
                type: 'cascader',
                configType: 'cascader', fieldType: 'cascader',
                // maskString: "",
                // maskLabel: "",
              },
              {
                parameter: "input",
                icon: "uil uil-key-skeleton-alt",
                label: "Password",
                type: 'input',
                configType: 'input', fieldType: 'password',
                // maskString: "",
                // maskLabel: ""
              },
              {
                parameter: "input",
                icon: "uil uil-bitcoin-sign",
                label: "Radio Button",
                type: 'radio',
                configType: 'radiobutton', fieldType: 'radio',
                // maskString: "",
                // maskLabel: "",
                options: true,
              },

              {
                parameter: "input",
                icon: "uil uil-dice-one pr-1",
                label: "Select One",
                type: 'select',
                configType: 'repeatSection', fieldType: 'Select',
                // maskString: "",
                // maskLabel: "",
                treeExpandIcon: 'fa-regular fa-d',
                treeInExpandIcon: 'fa-regular fa-d',
                options: true,
              },

              {
                parameter: "input",
                icon: "uil uil-phone-alt",
                label: "Telephone",
                type: 'input',
                configType: 'telephone', fieldType: 'tel',
                // maskString: "",
                // maskLabel: "",
              },
              {
                parameter: "input",
                icon: "uil uil-text",
                label: "Textarea",
                type: 'input',
                configType: 'textarea', fieldType: 'textarea',
                // maskString: "",
                // maskLabel: "",
              },

            ]
          },
          {
            label: "Date",
            id: "date",
            icon: "fa fa-chevron-up",
            children: [
              // {
              //   parameter: "input",
              //   icon: "uil uil-calender",
              //   label: "Date Picker",
              //   type: 'input',
              //   configType:'date',fieldType: 'date',
              // },
              {
                parameter: "input",
                icon: "uil uil-calender",
                label: "Date Range",
                type: 'rangePicker',
                configType: 'date', fieldType: 'date',
              },
              {
                parameter: "input",
                icon: "uil uil-calender",
                label: "Week Range",
                type: 'rangePicker',
                configType: 'week', fieldType: 'week',
              },
              {
                parameter: "input",
                icon: "uil uil-calender",
                label: "Month Range",
                type: 'rangePicker',
                configType: 'month', fieldType: 'month',
              },
              {
                parameter: "input",
                icon: "uil uil-calender",
                label: "year Range",
                type: 'rangePicker',
                configType: 'year', fieldType: 'year',
              },
              {
                parameter: "input",
                icon: "uil uil-calender",
                label: "Date Picker",
                type: 'zorro-datePicker',
                configType: 'date', fieldType: 'date',
                // maskString: "",
                // maskLabel: "",
              },
              {
                parameter: "input",
                icon: "uil uil-calender",
                label: "Date Picker",
                type: 'zorro-datePicker',
                configType: 'date', fieldType: 'date',
                // maskString: "",
                // maskLabel: "",
              },
              {
                parameter: "input",
                icon: "uil uil-calender",
                label: "Color wrapper",
                type: 'color',
                configType: 'color', fieldType: 'color',
                // maskString: "",
                // maskLabel: "",
              },
              {
                parameter: "input",
                icon: "uil uil-calender",
                label: "Year Picker",
                type: 'zorro-datePicker',
                configType: 'year', fieldType: 'year',
                // maskString: "",
                // maskLabel: "",
              },
              {
                parameter: "input",
                icon: "uil uil-calender",
                label: "week Picker",
                type: 'zorro-datePicker',
                configType: 'week', fieldType: 'week',
                // maskString: "",
                // maskLabel: "",
              },
              {
                parameter: "input",
                icon: "uil uil-calender",
                label: "Date & Time",
                type: 'input',
                configType: 'datetime', fieldType: 'datetime-local',
                // maskString: "",
                // maskLabel: "",
              },
              // {
              //   parameter: "input",
              //   icon: "uil uil-calender",
              //   label: "Month Picker",
              //   type: 'input',
              //   configType:'month',fieldType: 'month',
              //   // maskString: "",
              //    // maskLabel: "",
              // },
              // {
              //   parameter: "input",
              //   icon: "uil uil-clock",
              //   label: "Time Picker",
              //   type: 'input',
              //   configType:'time',fieldType: 'time',
              //   // maskString: "",
              //    // maskLabel: "",
              // },
              // {
              //   parameter: "input",
              //   label: "Week Picker",
              //   icon: "uil uil-calender",
              //   type: 'input',
              //   configType:'week',fieldType: 'week',
              //   // maskString: "",
              //    // maskLabel: "",
              // },
              // {
              //   parameter: "input",
              //   icon: "uil uil-calender",
              //   label: "Range",
              //   type: 'rangedatetime',
              //   configType:'rangedatetime',fieldType: 'rangedatetime',
              //   // maskString: "",
              //    // maskLabel: "",
              // },
              // {
              //   parameter: "input",
              //   icon: "uil uil-calender",
              //   label: "Time Picker",
              //   type: 'timepicker',
              //   configType:'timepicker',fieldType: 'timepicker',
              //   // maskString: "",
              //    // maskLabel: "",
              // },
              {
                parameter: "input",
                icon: "uil uil-calender",
                label: "Time Picker",
                type: 'zorro-timePicker',
                configType: 'timepicker', fieldType: 'timepicker',
                // maskString: "",
                // maskLabel: "",
              },
            ]
          },
          {
            label: "Masking",
            id: "masking",
            icon: "fa fa-chevron-up",
            children: [
              {
                parameter: "input",
                icon: "uil uil-file-alt",
                label: "4 digit Group",
                type: 'custom',
                configType: 'customMasking', fieldType: 'custom',
                maskString: "0,0000,0000,0000",
                maskLabel: "x,xxxx,xxxx,xxxx",
              },
              {
                parameter: "input",
                icon: "uil uil-users-alt",
                label: "CNPJ",
                type: 'custom',
                configType: 'customMasking', fieldType: 'custom',
                maskString: "00.000.000/0000-00",
                maskLabel: "xx.xxx.xxx/xxxx-xx",
              },
              {
                parameter: "input",
                icon: "uil uil-calendar-alt",
                label: "Date Masking",
                type: 'custom',
                configType: 'customMasking', fieldType: 'custom',
                maskString: "00/00/0000",
                maskLabel: "dd/mm/yyyy",
              },
              // {
              //   parameter: "input",
              //   icon: "uil uil-calendar-alt",
              //   label: "Date & Hour",
              //   type: 'custom',
              //   configType:'customMasking',fieldType: 'custom',
              //   maskString: "00/00/0000 00:00:00",
              //   maskLabel: "dd/mm/yyyy hh:mm:ss",
              // },
              // {
              //   parameter: "input",
              //   icon: "uil uil-text",
              //   label: "Input",
              //   type: 'custommasking',
              //   configType:'customMasking',fieldType: 'custom',
              //   maskString: "'A*",
              //   maskLabel: "A_Z"
              // },
              {
                parameter: "input",
                icon: "uil uil-server",
                label: "IP Address",
                type: 'custom',
                configType: 'customMasking', fieldType: 'custom',
                maskString: "099.099.099.099",
                maskLabel: "xxx.xxx.xxx.xxx",
              },
              {
                parameter: "input",
                icon: "uil-money-withdrawal",
                label: "Money",
                type: 'custom',
                configType: 'customMasking', fieldType: 'custom',
                maskString: "000.000.000.000.000,00",
                maskLabel: "Your money",
              },
              {
                parameter: "input",
                icon: "uil uil-phone-alt",
                label: "São Paulo",
                type: 'custom',
                configType: 'customMasking', fieldType: 'custom',
                maskString: "0000-0000",
                maskLabel: "xxxx-xxxx",
              },
              {
                parameter: "input",
                icon: "uil uil-phone-alt",
                label: "Telephone Masking",
                type: 'custom',
                configType: 'customMasking', fieldType: 'custom',
                maskString: "0000-0000",
                maskLabel: "xxxx-xxxx ",
              },
              {
                parameter: "input",
                icon: "uil uil-phone-alt",
                label: "Telephone with Code",
                type: 'custom',
                configType: 'customMasking', fieldType: 'custom',
                maskString: "0000-0000",
                maskLabel: "xxxx-xxxx",
              },
              {
                parameter: "input",
                icon: "uil uil-clock",
                label: "Time Masking",
                type: 'custom',
                configType: 'customMasking', fieldType: 'custom',
                maskString: "00:00:00",
                maskLabel: "hh:mm:ss",
              },
              {
                parameter: "input",
                icon: "uil uil-phone-alt",
                label: "US Telephone",
                type: 'custom',
                configType: 'customMasking', fieldType: 'custom',
                maskString: "0000-0000",
                maskLabel: "xxxx-xxxx",
              },
              {
                parameter: "input",
                icon: "uil-map-pin",
                label: "Zip Code",
                type: 'custom',
                configType: 'customMasking', fieldType: 'custom',
                maskString: "00000-000",
                maskLabel: "xxxxx-xxx",
              },
            ]
          }
        ]
      },
      {
        label: "Data Display",
        icon: "fa fa-chevron-down",
        id: "data-display",
        children: [
          {
            label: "Basic",
            id: "static-1",
            children: [
              {
                parameter: "avatar",
                icon: "uil uil-file-alt",
                label: "Avatar",
                isLeaf: true
              },

              {
                parameter: "badge",
                icon: "uil-arrow-break",
                label: "Badge",
                isLeaf: true
              },
              // {
              //   parameter: "treeView",
              //   icon: "uil uil-file-alt",
              //   label: "Tree View"
              // },
              {
                parameter: "calender",
                icon: "uil uil-file-alt",
                label: "Calendar",
                isLeaf: true
              },
              {
                parameter: "carouselCrossfadeMain",
                icon: "uil-sliders-v-alt",
                label: "Slider",
                isLeaf: true
              },
              // {
              //   parameter: "subCarouselCrossfade",
              //   icon: "uil-sliders-v-alt",
              //   label: "Slider",
              //   isLeaf: true
              // },
              {
                parameter: "comment",
                icon: "uil-arrow-break",
                label: "Comment",
                isLeaf: true
              },
              {
                parameter: "description",
                icon: "uil uil-file-alt",
                label: "Description",
                isLeaf: true
              },

              {
                parameter: "descriptionChild",
                icon: "uil uil-file-alt",
                label: "Description Child",
                isLeaf: true
              },
              {
                parameter: "statistic",
                icon: "uil-sliders-v-alt",
                label: "Statistic",
                isLeaf: true
              },
              {
                parameter: "empty",
                icon: "uil-arrow-break",
                label: "Empty Box",
                isLeaf: true
              },
              {
                parameter: "list",
                icon: "uil uil-file-alt",
                label: "New List",
                isLeaf: true
              },
              {
                parameter: "tag",
                icon: "uil-file-copy-alt",
                label: "Tag",
                isLeaf: true
              },
              {
                parameter: "popConfirm",
                icon: "uil-sliders-v-alt",
                label: "PopConfirm",
                isLeaf: true
              },
              {
                parameter: "timeline",
                icon: "uil-sliders-v-alt",
                label: "Timeline",
                isLeaf: true
              },
              // {
              //   parameter: "timelineChild",
              //   icon: "uil-sliders-v-alt",
              //   label: "Timeline Child",
              //   isLeaf: true
              // },
              {
                parameter: "popOver",
                icon: "uil-sliders-v-alt",
                label: "Pop Over",
                isLeaf: true
              },
              {
                parameter: "imageUpload",
                icon: "uil uil-file-alt",
                label: "Image",
                isLeaf: true
              },
              {
                parameter: "invoice",
                icon: "uil uil-file-alt",
                label: "Invoice",
                isLeaf: true
              },
              {
                parameter: "segmented",
                icon: "uil-toggle-off",
                label: "Segmented",
                isLeaf: true
              },

            ]
          },
          {
            label: "Card",
            id: "card",
            icon: "fa fa-chevron-down",
            children: [
              {
                parameter: "simplecard",
                icon: "uil uil-file-alt",
                label: "Card",
                isLeaf: true
              },
              {
                parameter: "cardWithComponents",
                icon: "uil uil-file-alt",
                label: "Card Components",
              },
              {
                parameter: "simpleCardWithHeaderBodyFooter",
                icon: "uil uil-file-alt",
                label: "Section Card",
                isLeaf: true
              },
              {
                parameter: "sharedMessagesChart",
                icon: "uil uil-file-alt",
                label: "Task Widget"
              }
            ]
          },
        ]
      },
      {
        label: "Html Code",
        id: "webCode",
        children: [
          {
            label: "Basic",
            id: "static-1",
            icon: "fa fa-chevron-down",
            children: [
              {
                parameter: "htmlBlock",
                icon: "uil uil-paragraph",
                label: "Add new",
                isLeaf: true
              },
              {
                parameter: "cvtemplate",
                icon: "uil uil-file-edit-alt",
                content: "assets/images/small/CV.jpg",
                name: "cvtemplate",
                label: "CV Template",
                isLeaf: true
              },
              {
                parameter: "dashnoicPricingTemplate",
                icon: "uil uil-money-withdrawal",
                content: "assets/images/small/dashonic-pricing-template.jpg",
                name: "dashnoicPricingTemplate",
                label: "Pricing",
                isLeaf: true
              },
              {
                parameter: "login",
                icon: "uil-key-skeleton-alt",
                content: "assets/images/small/login-Template.jpg",
                name: "login",
                label: "Login",
                isLeaf: true
              },
              {
                parameter: "loremIpsum",
                icon: "uil uil-text",
                content: "assets/images/small/lorem-ipsum.jpg",
                name: "loremIpsum",
                label: "Lorem Ipsum",
                isLeaf: true
              },
              {
                parameter: "dashnoicPricingTabletemplate",
                icon: "uil uil-money-withdrawal",
                content: "assets/images/small/dashonic-Pricing-Table.PNG",
                name: "dashnoicPricingTabletemplate",
                label: "Pricing Table",
                isLeaf: true
              },
              {
                parameter: "pricingtemplate",
                icon: "uil uil-money-withdrawal",
                content: "assets/images/small/price-Template.jpg",
                name: "pricingtemplate",
                label: "Pricing",
                isLeaf: true
              },
              {
                parameter: "registerTemplate",
                icon: "uil-document-layout-left",
                content: "assets/images/small/register-Template.jpg",
                name: "registerTemplate",
                label: "Register",
                isLeaf: true
              },
              {
                parameter: "signUpTemplate",
                icon: "uil-sign-in-alt",
                content: "assets/images/small/sign-Up.jpg",
                name: "signUpTemplate",
                label: "SignUp",
                isLeaf: true
              },
              {
                parameter: "profiletemplate",
                icon: "uil uil-user",
                content: "assets/images/small/dashoni-user-setting-template.jpg",
                name: "profiletemplate",
                label: "User Profile",
                isLeaf: true
              },
              {
                parameter: "invoiceTemplate",
                icon: "uil uil-file-edit-alt",
                content: "assets/images/small/invoiceTemplate.png",
                name: "invoiceTemplate",
                label: "Invoice Detail",
                isLeaf: true
              },
              // {
              //   parameter: "dashonicTemplate",
              //   icon: "uil uil-user",
              //   content: "assets/images/small/img-1.jpg",
              //   name: "openModal(content,'assets/images/small/img-1.jpg')",
              //   label: "Template"
              // },
            ]
          },
        ]
      },
      {
        label: "Website Block",
        id: "website-block",
        children: [
          {
            parameter: "webMenu",
            icon: "uil uil-file-alt",
            label: "Menu"
          },
          {
            parameter: "websiteHeader",
            icon: "uil uil-file-alt",
            label: "Header",
            children: [
              {
                parameter: "header_1",
                icon: "uil uil-file-alt",
                label: "Header 1",
              },
              {
                parameter: "header_2",
                icon: "uil uil-file-alt",
                label: "Header 2",
              },
              {
                parameter: "header_3",
                icon: "uil uil-file-alt",
                label: "Header 3",
              },
              {
                parameter: "header_4",
                icon: "uil uil-file-alt",
                label: "Header 4",
              },
              {
                parameter: "header_5",
                icon: "uil uil-file-alt",
                label: "Header 5",
              },
              {
                parameter: "header_6",
                icon: "uil uil-file-alt",
                label: "Header 6",
              },
              {
                parameter: "header_7",
                icon: "uil uil-file-alt",
                label: "Header 7",
              },
            ]
          },
          {
            parameter: "websiteHeader",
            icon: "uil uil-file-alt",
            label: "Pricing",
            children: [
              {
                parameter: "pricing",
                icon: "uil uil-file-alt",
                label: "Pricing",
              },
            ]
          },
          {
            parameter: "websiteArticle",
            icon: "uil uil-file-alt",
            label: "Article",
            children: []
          },
          {
            parameter: "websiteImageVideo",
            icon: "uil uil-file-alt",
            label: "Image & Video",
            children: []
          },
          {
            parameter: "websiteGallerySlider",
            icon: "uil uil-file-alt",
            label: "Gallery & Slider",
            children: []
          },
          {
            parameter: "websitePeople",
            icon: "uil uil-file-alt",
            label: "People",
            children: []
          },
          {
            parameter: "websiteContact",
            icon: "uil uil-file-alt",
            label: "Contact",
            children: []
          },
          {
            parameter: "websiteSocial",
            icon: "uil uil-file-alt",
            label: "Social",
            children: []
          },
          {
            parameter: "websiteFooter",
            icon: "uil uil-file-alt",
            label: "Footer",
            children: []
          },
          {
            parameter: "websiteForm",
            icon: "uil uil-file-alt",
            label: "Form",
            children: []
          },
          {
            parameter: "websiteNews",
            icon: "uil uil-file-alt",
            label: "News",
            children: []
          },
          {
            parameter: "websiteList",
            icon: "uil uil-file-alt",
            label: "List",
            children: []
          },
          {
            parameter: "websiteNumber",
            icon: "uil uil-file-alt",
            label: "Number",
            children: []
          },
        ]
      },
      {
        label: "Template",
        id: "template",
        icon: "fa fa-chevron-down",
        children: [
          {
            label: "Basic",
            id: "static-1",
            icon: "fa fa-chevron-down",
            children: [
              // {
              //   parameter: "address_form",
              //   icon: "uil uil-home-alt",
              //   label: "Address"
              // },
              // {
              //   parameter: "employee_form",
              //   icon: "uil uil-user",
              //   label: "Employee Form"
              // },
              // {
              //   parameter: "login_Form",
              //   icon: "uil uil-key-skeleton-alt",
              //   label: "Log In"
              // },
              // {
              //   parameter: "signUp_Form",
              //   icon: "uil uil-file-check-alt",
              //   label: "Sign Up"
              // },
            ]
          },
        ]
      },
      {
        label: "Chart",
        id: "chart",
        children: [
          {
            label: "Basic",
            id: "static-1",
            icon: "fa fa-chevron-down",
            children: [
              {
                parameter: "barChart",
                icon: "uil uil-file-alt",
                label: "Bar Chart",
                isLeaf: true
              },
              {
                parameter: "pieChart",
                icon: "uil uil-file-alt",
                label: "Pie Chart",
                isLeaf: true
              },
              {
                parameter: "bubbleChart",
                icon: "uil uil-file-alt",
                label: "Bubble Chart",
                isLeaf: true
              },
              {
                parameter: "candlestickChart",
                icon: "uil uil-file-alt",
                label: "Candlestick Chart",
                isLeaf: true
              },
              {
                parameter: "columnChart",
                icon: "uil uil-file-alt",
                label: "Column Chart",
                isLeaf: true
              },
              {
                parameter: "orgChart",
                icon: "uil uil-file-alt",
                label: "Org Chart",
                isLeaf: true
              },
              {
                parameter: "tableChart",
                icon: "uil uil-file-alt",
                label: "Table Chart",
                isLeaf: true
              },
              {
                parameter: "treeMapChart",
                icon: "uil uil-file-alt",
                label: "Tree Map Chart",
                isLeaf: true
              },
              {
                parameter: "ganttChart",
                icon: "uil uil-file-alt",
                label: "Gantt Chart",
                isLeaf: true
              },
              {
                parameter: "geoChart",
                icon: "uil uil-file-alt",
                label: "Geo Chart",
                isLeaf: true
              },
              {
                parameter: "histogramChart",
                icon: "uil uil-file-alt",
                label: "Histogram Chart",
                isLeaf: true
              },
              {
                parameter: "lineChart",
                icon: "uil uil-file-alt",
                label: "Line Chart",
                isLeaf: true
              },
              {
                parameter: "sankeyChart",
                icon: "uil uil-file-alt",
                label: "Sankey Chart",
                isLeaf: true
              },
              {
                parameter: "scatterChart",
                icon: "uil uil-file-alt",
                label: "Scatter Chart",
                isLeaf: true
              },
              {
                parameter: "areaChart",
                icon: "uil uil-file-alt",
                label: "Area Chart",
                isLeaf: true
              },
              {
                parameter: "comboChart",
                icon: "uil uil-file-alt",
                label: "Combo Chart",
                isLeaf: true
              },
              {
                parameter: "steppedAreaChart",
                icon: "uil uil-file-alt",
                label: "Stepped Area Chart",
                isLeaf: true
              },
              {
                parameter: "timelineChart",
                icon: "uil uil-file-alt",
                label: "Timeline Chart",
                isLeaf: true
              },
              // {
              //   parameter: "browserChart",
              //   icon: "uil uil-file-alt",
              //   label: "Browser Chart"
              // },
              // {
              //   parameter: "browserCombineChart",
              //   icon: "uil uil-file-alt",
              //   label: "Browser Combine Chart"
              // },
              // {
              //   parameter: "chartcard",
              //   icon: "uil uil-file-alt",
              //   label: "Chart"
              // },
              // {
              //   parameter: "salesAnalyticschart",
              //   icon: "uil uil-file-alt",
              //   label: "Sales Analytical Chart"
              // },
              // {
              //   parameter: "donuteSaleChart",
              //   icon: "uil uil-file-alt",
              //   label: "Sale Donut Chart"
              // },
              // {
              //   parameter: "sectionCard",
              //   icon: "uil uil-file-alt",
              //   label: "Section Chart"
              // },
              // {
              //   parameter: "donutChart",
              //   icon: "uil uil-file-alt",
              //   label: "Visitor Donut Chart"
              // },
              // {
              //   parameter: "widgetSectionCard",
              //   icon: "uil uil-file-alt",
              //   label: "Widget Section Chart"
              // },
            ]
          },
        ]
      },
      {
        label: "Feedback",
        id: "feedback",
        children: [
          {
            label: "Basic",
            id: "static-1",
            icon: "fa fa-chevron-down",
            children: [
              {
                parameter: "alert",
                icon: "uil-cloud-exclamation",
                label: "Alert",
                isLeaf: true
              },
              {
                parameter: "drawer",
                icon: "uil uil-file-alt",
                label: "Drawer",
                isLeaf: true
              },
              {
                parameter: "message",
                icon: "uil-file-copy-alt",
                label: "Message",
                isLeaf: true
              },
              {
                parameter: "modal",
                icon: "uil-file-copy-alt",
                label: "Modal"
              },
              {
                parameter: "notification",
                icon: "uil-file-copy-alt",
                label: "Notification",
                isLeaf: true
              },

              {
                parameter: "progressBar",
                icon: "uil-sliders-v-alt",
                label: "Progress Bar",
                isLeaf: true
              },
              {
                parameter: "result",
                icon: "uil-sliders-v-alt",
                label: "Result",
                isLeaf: true
              },

              {
                parameter: "skeleton",
                icon: "uil-sliders-v-alt",
                label: "Skeleton",
                isLeaf: true
              },
              {
                parameter: "spin",
                icon: "uil-toggle-off",
                label: "Spin",
                isLeaf: true
              },
            ]
          },
        ]
      },
      {
        label: "Components",
        id: "components",
        icon: "fa fa-chevron-down",
        children: [
          {
            label: "Basic",
            id: "static-1",
            children: [
              {
                parameter: "accordionButton",
                icon: "uil uil-file-alt",
                label: "Accordion Button"
              },
              {
                parameter: "contactList",
                icon: "uil uil-file-alt",
                label: "Contact List"
              },
              {
                parameter: "audio",
                icon: "uil uil-file-alt",
                label: "Play Audio",
                isLeaf: true
              },


              {
                parameter: "breakTag",
                icon: "uil-arrow-break",
                label: "Break Tag",
                isLeaf: true
              },

              // {
              //   parameter: "carouselCrossfade",
              //   icon: "uil-sliders-v-alt",
              //   label: "Slider"
              // },
              {
                parameter: "rangeSlider",
                icon: "uil-sliders-v-alt",
                label: "Range Slider",
                isLeaf: true
              },



              // {
              //   parameter: "fileupload",
              //   icon: "uil uil-file-alt",
              //   label: "File Manager"
              // },

              {
                parameter: "kanabnAddNew",
                icon: "uil uil-file-alt",
                label: "kanban"
              },
              // {
              //   parameter: "kanbanChild",
              //   icon: "uil uil-file-alt",
              //   label: "kanban Child"
              // },
              // {
              //   parameter: "kanbanTask",
              //   icon: "uil uil-file-alt",
              //   label: "Kanban Task"
              // },


              // {
              //   parameter: "multiFileUpload",
              //   icon: "uil-file-copy-alt",
              //   label: "Multi-file Uploader",
              //   isLeaf: true
              // },


              {
                parameter: "rate",
                icon: "uil-sliders-v-alt",
                label: "Rating",
                isLeaf: true
              },


              {
                parameter: "textEditor",
                icon: "uil uil-file-alt",
                label: "Editor",
                isLeaf: true
              },

              {
                parameter: "toastr",
                icon: "uil-sliders-v-alt",
                label: "Toastr",
                isLeaf: true
              },
              {
                parameter: "video",
                icon: "uil uil-file-alt",
                label: "Play Video",
                isLeaf: true
              },
            ]
          },
        ]
      },
      {
        label: "Other",
        id: "other",
        children: [
          {
            label: "Basic",
            id: "static-1",
            icon: "fa fa-chevron-down",
            children: [
              {
                parameter: "addSection",
                icon: "uil uil-bitcoin-sign",
                label: "Add Section"
              },
              // {
              //   parameter: "dynamicSections",
              //   icon: "uil uil-bitcoin-sign",
              //   label: "Dynamic Section"
              // },
              {
                parameter: "input",
                icon: "uil uil-calender",
                label: "URL",
                type: 'input',
                configType: 'url', fieldType: 'url',
                // maskString: "",
                // maskLabel: "",
              },
              {
                parameter: "dashonictabsAddNew",
                icon: "uil uil-search-plus",
                label: "Tabs"
              },
              // {
              //   parameter: "input",
              //   icon: "uil uil-location-point",
              //   label: "Tags",
              //   type: 'tag',
              //   configType: 'tag', fieldType: 'tag',
              //   // maskString: "",
              //   // maskLabel: "",
              //   options: true,
              // },
              {
                parameter: "input",
                icon: "uil uil-search-plus",
                label: "Search",
                type: 'autoComplete',
                configType: 'autoComplete', fieldType: 'autoComplete',
                options: true,
              },
              {
                parameter: "fixedDiv",
                icon: "uil-square-full",
                label: "Fixed Div",
                isLeaf: true
              },
              {
                parameter: "div",
                icon: "uil-square-full",
                label: "Div",
                isLeaf: true
              },
              {
                parameter: "mainDiv",
                icon: "uil-square-full",
                label: "Main Div"
              },
              {
                parameter: "input",
                icon: "uil uil-images",
                label: "File Uploader",
                type: 'image-upload',
                configType: 'image', fieldType: 'image-upload',
                // maskString: "",
                // maskLabel: ""
              },
              {
                parameter: "input",
                icon: "uil uil-images",
                label: "Multi-file Uploader",
                type: 'multiFileUploader',
                configType: 'multiFileUploader', fieldType: 'multiFileUploader',
              },
              {
                parameter: "input",
                icon: "uil uil-images",
                label: "Audio Recorder",
                type: 'audioVideoRecorder',
                configType: 'audioVideoRecorder', fieldType: 'audioVideoRecorder',
              },
              {
                parameter: "input",
                icon: "uil uil-images",
                label: "Custome Clearence",
                type: 'customeClearence',
                configType: 'input', fieldType: 'input',
              },
              {
                parameter: "input",
                icon: "uil uil-images",
                label: "Repeat Input",
                type: 'repeat',
                configType: 'input', fieldType: 'input',
                // maskString: "",
                // maskLabel: ""
              },
              {
                parameter: "input",
                icon: "uil uil-bullseye",
                label: "Color",
                type: 'input',
                configType: 'color', fieldType: 'color',
                // maskString: "",
                // maskLabel: ""
              },
              {
                parameter: "backTop",
                icon: "uil uil-file-alt",
                label: "Back Top",
                isLeaf: true
              },
              {
                parameter: "anchor",
                icon: "uil uil-file-alt",
                label: "Anchor",
                isLeaf: true
              },
              {
                parameter: "listWithComponents",
                icon: "uil uil-file-alt",
                label: "list With Components",
                isLeaf: true
              },
              {
                parameter: "menu",
                icon: "uil uil-file-alt",
                label: "Menu",
                isLeaf: true
              },
              {
                parameter: "map",
                icon: "uil uil-file-alt",
                label: "map",
                isLeaf: true
              },
              {
                parameter: "headerLogo",
                icon: "uil uil-file-alt",
                label: "Header Logo",
                isLeaf: true
              },
              {
                parameter: "fileManager",
                icon: "uil uil-file-alt",
                label: "File Manager",
                isLeaf: true
              },
              {
                parameter: "qrcode",
                icon: "uil uil-file-alt",
                label: "Qr Code",
                isLeaf: true
              },
              {
                parameter: "chat",
                icon: "uil uil-file-alt",
                label: "Chat",
                isLeaf: true
              },
              {
                parameter: "email_template",
                icon: "uil uil-file-alt",
                label: "Email Template",
                isLeaf: true
              },
              {
                parameter: "taskManager",
                icon: "uil uil-file-alt",
                label: "Task manager",
                isLeaf: true
              },
              {
                parameter: "taskManagerComment",
                icon: "uil uil-file-alt",
                label: "Task manager Comment",
                isLeaf: true
              },
            ]
          },
        ]
      },
    ]
  }
]
