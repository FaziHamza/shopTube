export const htmlTabsData = [
  {
    label: "Heading here",
    children: [
      {
        label: "Input Fields",
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
              {
                parameter: "alert",
                icon: "uil-cloud-exclamation",
                label: "Alert"
              },
              {
                parameter: "input",
                icon: "uil-check-square",
                label: "Checkbox",
                type: 'checkbox',
                fieldType: 'checkbox',
                // maskString: "",
                // maskLabel: ""
                options:true,
              },
              {
                parameter: "input",
                icon: "uil uil-bullseye",
                label: "Color",
                type: 'input',
                fieldType: 'color',
                // maskString: "",
                // maskLabel: ""
              },
              {
                parameter: "input",
                icon: "uil uil-file-alt",
                label: "Decimal",
                type: 'input',
                fieldType: 'decimal',
                // maskString: "",
                // maskLabel: ""
              },
              {
                parameter: "input",
                icon: "uil uil-fast-mail",
                label: "Email",
                type: 'input',
                fieldType: 'input',
                // maskString: "",
                // maskLabel: ""
              },
              {
                parameter: "fixedDiv",
                icon: "uil-square-full",
                label: "Fixed Div"
              },
              {
                parameter: "heading",
                icon: "uil uil-text",
                label: "Heading"
              },
              {
                parameter: "input",
                icon: "uil uil-images",
                label: "image",
                type: 'input',
                fieldType: 'file',
                // maskString: "",
                // maskLabel: ""
              },
              {
                parameter: "input",
                icon: "uil uil-text",
                label: "Input",
                type: 'input',
                fieldType: 'input',
                // maskString: "",
                // maskLabel: ""
              },
              {
                parameter: "inputGroup",
                icon: "uil uil-text",
                label: "Input Group"
              },
              {
                parameter: "inputGroupGrid",
                icon: "uil uil-text",
                label: "Input Group Grid"
              },
              {
                parameter: "input",
                icon: "uil uil-list-ul",
                label: "Multi Select",
                type: 'ng-select',
                fieldType: 'ng-select',
                options:true,
                // maskString: "",
                // maskLabel: ""
              },
              {
                parameter: "input",
                icon: "uil uil-file-alt",
                label: "Number",
                type: 'input',
                fieldType: 'input',
                // maskString: "",
              },
              {
                parameter: "paragraph",
                icon: "uil uil-paragraph",
                label: "Paragraph"
              },
              {
                parameter: "input",
                icon: "uil uil-key-skeleton-alt",
                label: "Password",
                type: 'input',
                fieldType: 'password',
                // maskString: "",
                 // maskLabel: ""
              },
              {
                parameter: "radiobutton",
                icon: "uil uil-bitcoin-sign",
                label: "Radio Button",
                type: 'radio',
                fieldType: 'radio',
                // maskString: "",
                 // maskLabel: "",
                 options:true,
              },
              {
                parameter: "search",
                icon: "uil uil-search-plus",
                label: "Search",
                type: 'ng-search',
                fieldType: 'ng-search',
                // maskString: "",
                 // maskLabel: "",
                 options:true,
              },
              {
                parameter: "dashonictabsAddNew",
                icon: "uil uil-search-plus",
                label: "Tabs"
              },
              {
                parameter: "repeatSection",
                icon: "uil uil-dice-one pr-1",
                label: "Select One"
              },
              {
                parameter: "stepperAddNew",
                icon: "uil-list-ul",
                label: "Stepper"
              },
              {
                parameter: "tags",
                icon: "uil uil-location-point",
                label: "Tags"
              },
              {
                parameter: "telephone",
                icon: "uil uil-phone-alt",
                label: "Telephone"
              },
              {
                parameter: "textarea",
                icon: "uil uil-text",
                label: "Textarea"
              },
              {
                parameter: "url",
                icon: "uil uil-calender",
                label: "URL"
              },
            ]
          },
          {
            label: "Date",
            id: "static-2",
            icon: "fa fa-chevron-up",
            children: [
              {
                parameter: "date",
                icon: "uil uil-calender",
                label: "Date Picker"
              },
              {
                parameter: "datetime",
                icon: "uil uil-calender",
                label: "Date & Time"
              },
              {
                parameter: "month",
                icon: "uil uil-calender",
                label: "Month Picker"
              },
              {
                parameter: "time",
                icon: "uil uil-clock",
                label: "Time Picker"
              },
              {
                parameter: "week",
                icon: "uil uil-calender",
                label: "Week Picker"
              },
              {
                parameter: "rangedatetime",
                icon: "uil uil-calender",
                label: "Range"
              },
              {
                parameter: "timepicker",
                icon: "uil uil-calender",
                label: "Time Picker"
              },
            ]
          },
          {
            label: "Masking",
            id: "static-3",
            icon: "fa fa-chevron-up",
            children: [
              {
                parameter: "4digitGroupMasking",
                icon: "uil uil-file-alt",
                label: "4 digit Group"
              },
              {
                parameter: "cNPJMasking",
                icon: "uil uil-users-alt",
                label: "CNPJ"
              },
              {
                parameter: "dateMasking",
                icon: "uil uil-calendar-alt",
                label: "Date"
              },
              {
                parameter: "dateTimeMasking",
                icon: "uil uil-calendar-alt",
                label: "Date & Hour"
              },
              {
                parameter: "input",
                icon: "uil uil-text",
                label: "Input",
                type: 'custommasking',
                fieldType: 'custom',
                maskString: "'A*",
                maskLabel: "A_Z"
              },
              {
                parameter: "iPAddressMasking",
                icon: "uil uil-server",
                label: "IP Address"
              },
              {
                parameter: "moneyMasking",
                icon: "uil-money-withdrawal",
                label: "Money"
              },
              {
                parameter: "sãoPauloCelphonesMasking",
                icon: "uil uil-phone-alt",
                label: "São Paulo Celphones"
              },
              {
                parameter: "telephoneMasking",
                icon: "uil uil-phone-alt",
                label: "Telephone"
              },
              {
                parameter: "telephonewithCodeAreaMasking",
                icon: "uil uil-phone-alt",
                label: "Telephone with Code Area"
              },
              {
                parameter: "timeMasking",
                icon: "uil uil-clock",
                label: "Time"
              },
              {
                parameter: "uSTelephoneMasking",
                icon: "uil uil-phone-alt",
                label: "US Telephone"
              },
              {
                parameter: "zipCodeMasking",
                icon: "uil-map-pin",
                label: "Zip Code"
              },
            ]
          }
        ]
      },
      {
        label: "Actions",
        id: "static-4",
        children: [
          {
            label: "Basic",
            id: "static-1",
            icon: "fa fa-chevron-down",
            children: [
              {
                parameter: "buttonGroup",
                icon: "uil uil-bitcoin-sign",
                label: "Actions Group"
              },
              {
                parameter: "insertButton",
                icon: "uil uil-bitcoin-sign",
                label: "Insert Button"
              },
              {
                parameter: "updateButton",
                icon: "uil uil-bitcoin-sign",
                label: "Update Button"
              },
              {
                parameter: "deleteButton",
                icon: "uil uil-bitcoin-sign",
                label: "Delete Button"
              },
              {
                parameter: "dropdownButton",
                icon: "uil uil-bitcoin-sign",
                label: "Dropdown Menu"
              },
              {
                parameter: "linkbutton",
                icon: "uil uil-bitcoin-sign",
                label: "Link Button"
              },
            ]
          },
        ]
      },
      {
        label: "Html Block",
        id: "static-4",
        children: [
          {
            label: "Basic",
            id: "static-1",
            icon: "fa fa-chevron-down",
            children: [
              {
                parameter: "htmlBlock",
                icon: "uil uil-paragraph",
                label: "Add new"
              },
              {
                parameter: "cvtemplate",
                icon: "uil uil-file-edit-alt",
                content: "assets/images/small/CV.jpg",
                name: "cvtemplate",
                label: "CV Template"
              },
              {
                parameter: "dashnoicPricingTemplate",
                icon: "uil uil-money-withdrawal",
                content: "assets/images/small/dashonic-pricing-template.jpg",
                name: "dashnoicPricingTemplate",
                label: "Dashnoic Pricing Template"
              },
              {
                parameter: "login",
                icon: "uil-key-skeleton-alt",
                content: "assets/images/small/login-Template.jpg",
                name: "login",
                label: "Loging Template"
              },
              {
                parameter: "loremIpsum",
                icon: "uil uil-text",
                content: "assets/images/small/lorem-ipsum.jpg",
                name: "loremIpsum",
                label: "Lorem Ipsum Template"
              },
              {
                parameter: "dashnoicPricingTabletemplate",
                icon: "uil uil-money-withdrawal",
                content: "assets/images/small/dashonic-Pricing-Table.PNG",
                name: "dashnoicPricingTabletemplate",
                label: "Pricing Table Template"
              },
              {
                parameter: "pricingtemplate",
                icon: "uil uil-money-withdrawal",
                content: "assets/images/small/price-Template.jpg",
                name: "pricingtemplate",
                label: "Pricing Template"
              },
              {
                parameter: "registerTemplate",
                icon: "uil-document-layout-left",
                content: "assets/images/small/register-Template.jpg",
                name: "registerTemplate",
                label: "Register Template"
              },
              {
                parameter: "signUpTemplate",
                icon: "uil-sign-in-alt",
                content: "assets/images/small/sign-Up.jpg",
                name: "signUpTemplate",
                label: "SignUp Template"
              },
              {
                parameter: "profiletemplate",
                icon: "uil uil-user",
                content: "assets/images/small/dashoni-user-setting-template.jpg",
                name: "profiletemplate",
                label: "User Profile"
              },
              {
                parameter: "invoiceTemplate",
                icon: "uil uil-file-edit-alt",
                content: "assets/images/small/invoiceTemplate.png",
                name: "invoiceTemplate",
                label: "Invoice Detail"
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
        label: "Template",
        icon: "fa fa-chevron-down",
        children: [
          {
            label: "Basic",
            id: "static-1",
            icon: "fa fa-chevron-down",
            children: [
              {
                parameter: "address_form",
                icon: "uil uil-home-alt",
                label: "Address"
              },
              {
                parameter: "employee_form",
                icon: "uil uil-user",
                label: "Employee Form"
              },
              {
                parameter: "login_Form",
                icon: "uil uil-key-skeleton-alt",
                label: "Log In"
              },
              {
                parameter: "signUp_Form",
                icon: "uil uil-file-check-alt",
                label: "Sign Up"
              },
            ]
          },
        ]
      },
      {
        label: "Chart",
        children: [
          {
            label: "Basic",
            id: "static-1",
            icon: "fa fa-chevron-down",
            children: [
              {
                parameter: "browserChart",
                icon: "uil uil-file-alt",
                label: "Browser Chart"
              },
              // {
              //   parameter: "browserCombineChart",
              //   icon: "uil uil-file-alt",
              //   label: "Browser Combine Chart"
              // },
              {
                parameter: "chartcard",
                icon: "uil uil-file-alt",
                label: "Chart"
              },
              {
                parameter: "salesAnalyticschart",
                icon: "uil uil-file-alt",
                label: "Sales Analytical Chart"
              },
              {
                parameter: "donuteSaleChart",
                icon: "uil uil-file-alt",
                label: "Sale Donut Chart"
              },
              {
                parameter: "sectionCard",
                icon: "uil uil-file-alt",
                label: "Section Chart"
              },
              {
                parameter: "donutChart",
                icon: "uil uil-file-alt",
                label: "Visitor Donut Chart"
              },
              {
                parameter: "widgetSectionCard",
                icon: "uil uil-file-alt",
                label: "Widget Section Chart"
              },
            ]
          },
        ]
      },
      {
        label: "Widgets",
        children: [
          {
            label: "Basic",
            id: "static-1",
            icon: "fa fa-chevron-down",
            children: [
              {
                parameter: "simplecard",
                icon: "uil uil-file-alt",
                label: "Card"
              },
              {
                parameter: "simpleCardWithHeaderBodyFooter",
                icon: "uil uil-file-alt",
                label: "Card With Header Body & Footer"
              },
              {
                parameter: "sharedMessagesChart",
                icon: "uil uil-file-alt",
                label: "Task Widget"
              },
            ]
          },
        ]
      },
      {
        label: "Data Grid",
        icon: "fa fa-chevron-down",
        children: [
          {
            label: "Basic",
            id: "static-1",
            children: [
              // {
              //   parameter: "container",
              //   icon: "uil uil-file-alt",
              //   label: "Container"
              // },
              {
                parameter: "gridList",
                icon: "uil uil-file-alt",
                label: "List/Data Grid"
              },
              {
                parameter: "gridListEditDelete",
                icon: "uil uil-file-alt",
                label: "List/Data Grid Update/Delete"
              },
              {
                parameter: "invoiceGrid",
                icon: "uil uil-file-alt",
                label: "Invoice Grid"
              },
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
        label: "Components",
        icon: "fa fa-chevron-down",
        children: [
          {
            label: "Basic",
            id: "static-1",
            children: [
              {
                parameter: "avatar",
                icon: "uil uil-file-alt",
                label: "Avatar"
              },
              {
                parameter: "affix",
                icon: "uil uil-file-alt",
                label: "Affix"
              },
              {
                parameter: "accordionButton",
                icon: "uil uil-file-alt",
                label: "Accordion Button"
              },
              {
                parameter: "breakTag",
                icon: "uil-arrow-break",
                label: "Break Tag"
              },
              {
                parameter: "badge",
                icon: "uil-arrow-break",
                label: "Badge"
              },
              {
                parameter: "cascader",
                icon: "uil-arrow-break",
                label: "Cascader"
              },
              {
                parameter: "comment",
                icon: "uil-arrow-break",
                label: "Comment"
              },
              {
                parameter: "editor_js",
                icon: "uil-arrow-break",
                label: "Editor js"
              },
              {
                parameter: "tuiCalender",
                icon: "uil uil-file-alt",
                label: "Calendar"
              },
              {
                parameter: "divider",
                icon: "uil uil-file-alt",
                label: "Divider"
              },
              {
                parameter: "textEditor",
                icon: "uil uil-file-alt",
                label: "Editor"
              },
              // {
              //   parameter: "fileupload",
              //   icon: "uil uil-file-alt",
              //   label: "File Manager"
              // },
              {
                parameter: "imageUpload",
                icon: "uil uil-file-alt",
                label: "Image Upload"
              },
              {
                parameter: "invoice",
                icon: "uil uil-file-alt",
                label: "Invoice"
              },
              {
                parameter: "kanabnAddNew",
                icon: "uil uil-file-alt",
                label: "kanabn"
              },
              {
                parameter: "kanbanTask",
                icon: "uil uil-file-alt",
                label: "Kanban Task"
              },
              {
                parameter: "multiFileUpload",
                icon: "uil-file-copy-alt",
                label: "Multi File Upload"
              },
              {
                parameter: "modal",
                icon: "uil-file-copy-alt",
                label: "Modal"
              },
              {
                parameter: "nzTag",
                icon: "uil-file-copy-alt",
                label: "NZ Tag"
              },
              {
                parameter: "audio",
                icon: "uil uil-file-alt",
                label: "Play Audio"
              },
              {
                parameter: "video",
                icon: "uil uil-file-alt",
                label: "Play Video"
              },
              {
                parameter: "rangeSlider",
                icon: "uil-sliders-v-alt",
                label: "Range Slider"
              },
              {
                parameter: "progressBar",
                icon: "uil-sliders-v-alt",
                label: "Progress Bar"
              },
              {
                parameter: "popOver",
                icon: "uil-sliders-v-alt",
                label: "Pop Over"
              },
              {
                parameter: "popConfirm",
                icon: "uil-sliders-v-alt",
                label: "PopConfirm"
              },
              {
                parameter: "carouselCrossfade",
                icon: "uil-sliders-v-alt",
                label: "Slider"
              },
              {
                parameter: "switch",
                icon: "uil-toggle-off",
                label: "switch"
              },
              {
                parameter: "segmented",
                icon: "uil-toggle-off",
                label: "Segmented"
              },
              {
                parameter: "spin",
                icon: "uil-toggle-off",
                label: "Spin"
              },
              {
                parameter: "treeSelect",
                icon: "uil-toggle-off",
                label: "Tree Select"
              },
              {
                parameter: "toastr",
                icon: "uil-sliders-v-alt",
                label: "Toastr"
              },
              {
                parameter: "starrate",
                icon: "uil-sliders-v-alt",
                label: "starrate"
              },
              {
                parameter: "timeline",
                icon: "uil-sliders-v-alt",
                label: "Timeline"
              },
              {
                parameter: "transfer",
                icon: "uil-sliders-v-alt",
                label: "Transfer"
              },
            ]
          },
        ]
      }
    ]
  }
]
