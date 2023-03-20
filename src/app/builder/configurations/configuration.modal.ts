import { FormlyFieldConfig } from "@ngx-formly/core";

export interface actionTypeFeild {
  form?: any;
  type?: any;
  tableDta?: any;
}
// action form
export class formFeildData {
  //radioFields
  radioFields: FormlyFieldConfig[] =
    [
      {
        fieldGroupClassName: "flex flex-wrap",
        fieldGroup: [
          // {
          //   key: 'formCheck',
          //   type: 'select',
          //   className: "w-1/4 px-1",
          //   wrappers: ["formly-vertical-wrapper"],
          //   templateOptions: {
          //     label: 'Format',
          //     options: [
          //       {
          //         label: 'Horizental',
          //         value: 'inline'
          //       },
          //       {
          //         label: 'Vertical',
          //         value: 'vertical'
          //       },

          //     ]
          //   },
          //   // defaultValue: 'Vertical'
          // },
          {
            key: 'api',
            type: 'select',
            className: "w-1/4 px-1",
            wrappers: ["formly-vertical-wrapper"],
            templateOptions: {
              label: 'Select API',
              options: [
                {
                  label: "Api",
                  value: "MultiAPIData"
                },
              ]
            },
          },
        ]
      },
      {
        template: '<div class="bold-label mt-3">options</div>',
      },
      {
        key: 'options',
        type: 'repeatSection',
        // wrappers:["form-field-horizontal"],
        templateOptions: {
          style: "margin-top: 6%;",
          canAdd: true,
          canRemove: true
        },
        fieldArray: {
          className: 'ml-3 me-2',
          fieldGroup: [
            {
              key: 'value',
              type: 'input',
              className: "ml-2",
              wrappers: ["formly-vertical-wrapper"],
              templateOptions: {
                label: 'value'
              }
            },
            {
              key: 'label',
              type: 'input',
              className: "ml-2",
              wrappers: ["formly-vertical-wrapper"],
              templateOptions: {
                label: 'Label'
              }
            }
          ]
        }
      },
    ]
  selectFields: FormlyFieldConfig[] =
    [
      {
        fieldGroupClassName: "flex flex-wrap",
        fieldGroup: [
          {
            key: 'api',
            type: 'select',
            className: "w-1/4 px-1",
            wrappers: ["formly-vertical-wrapper"],
            templateOptions: {
              label: 'Select API',
              options: [
                {
                  label: "Api",
                  value: "MultiAPIData"
                },
              ]
            },
          },
        ]
      },
      {
        template: '<div class="bold-label mt-3">options</div>',
      },
      {
        key: 'options',
        type: 'repeatSection',
        className: "w-full px-1",
        templateOptions: {
          style: "margin-top: 6%;",
          canAdd: true,
          canRemove: true
        },
        fieldArray: {
          className: 'ml-3 me-2',
          fieldGroup: [
            {
              key: 'label',
              type: 'input',
              wrappers: ["formly-vertical-wrapper"],
              templateOptions: {
                label: 'label'
              }
            },
            {
              className: "ml-2",
              key: 'value',
              type: 'input',
              wrappers: ["formly-vertical-wrapper"],
              templateOptions: {
                label: 'value'
              }
            },

          ]
        }
      }
    ]
  //used in formly form
  // methodUrl: FormlyFieldConfig[] = [{
  //   key: 'method',
  //   type: 'input',
  //   templateOptions: {
  //     label: 'Api Url'
  //   }
  // }]
  //Button Json
  buttonFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          key: 'color',
          type: 'select',
          className: "w-1/4 px-1",
          "wrappers": ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Button Color',
            options: [
              {
                label: 'White',
                value: 'bg-white-600'
              },
              {
                label: 'Blue',
                value: 'bg-blue-600'
              },
              {
                label: 'Grey',
                value: 'bg-gray-600'
              },
              {
                label: 'Red',
                value: 'bg-red-600'
              },
              {
                label: 'Green',
                value: 'bg-green-600'
              },
              {
                label: 'Light Blue',
                value: 'bg-blue-200'
              },
              {
                label: 'Yellow',
                value: 'bg-yellow-600'
              },
              {
                label: 'Purple',
                value: 'bg-purple-600'
              },
              {
                label: 'Black',
                value: 'bg-black-600'
              },

            ]
          },
        },
        {
          key: 'onhover',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Button Color on Hover',
            options: [
              {
                label: 'White',
                value: 'hover:bg-white-400'
              },
              {
                label: 'Blue',
                value: 'hover:bg-blue-400'
              },
              {
                label: 'Grey',
                value: 'hover:bg-gray-400'
              },
              {
                label: 'Red',
                value: 'hover:bg-red-400'
              },
              {
                label: 'Green',
                value: 'hover:bg-green-400'
              },
              {
                label: 'Light Blue',
                value: 'hover:bg-blue-200'
              },
              {
                label: 'Yellow',
                value: 'hover:bg-yellow-400'
              },
              {
                label: 'Purple',
                value: 'hover:bg-purple-400'
              },
              {
                label: 'Black',
                value: 'hover:bg-black-300'
              },

            ]
          },
        },
        {
          key: 'format',
          type: 'select',
          className: "w-1/4 px-1",
          "wrappers": ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Button Position',
            options: [
              {
                label: 'Left',
                value: 'text-left'
              },
              {
                label: 'Right',
                value: 'text-right'
              },
              {
                label: 'Text Center',
                value: 'text-center'
              },
            ]
          },
        },
        {
          key: 'nzSize',
          type: 'select',
          className: "w-1/4 px-1",
          "wrappers": ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Size',
            options: [
              {
                label: 'large',
                value: 'large'
              },
              {
                label: 'small',
                value: 'small'
              },
              {
                label: 'default',
                value: 'default'
              },
            ]
          },
        },
        {
          key: 'nzShape',
          type: 'select',
          className: "w-1/4 px-1",
          "wrappers": ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Shape',
            options: [
              {
                label: 'Circle',
                value: 'circle'
              },
              {
                label: 'Round',
                value: 'round'
              },
              {
                label: 'default',
                value: 'default'
              },
            ]
          },
        },
        {
          key: 'btnIcon',
          type: 'input',
          className: "w-1/4 px-1",
          "wrappers": ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Button Icon'
          }
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'disabled',
          type: 'checkbox',
          templateOptions: {
            label: 'Disabled',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'nzGhost',
          type: 'checkbox',
          templateOptions: {
            label: 'Ghost',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'nzLoading',
          type: 'checkbox',
          templateOptions: {
            label: 'Loading',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'nzBlock',
          type: 'checkbox',
          templateOptions: {
            label: 'Block',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'nzDanger',
          type: 'checkbox',
          templateOptions: {
            label: 'Danger',
          },
          defaultValue: false
        },

      ]
    },
  ]
  buttonGroupFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          key: 'btngroupformat',
          type: 'select',
          className: "w-1/4 px-1",
          "wrappers": ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Button Group position',
            options: [
              {
                label: 'Left',
                value: 'text-left'
              },
              {
                label: 'Right',
                value: 'text-right'
              },
              {
                label: 'Center',
                value: 'text-center'
              },
            ]
          },
        },


      ]
    },
  ]
  dropdownButtonFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          key: 'title',
          type: 'input',
          className: "w-1/4 px-1",
          "wrappers": ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Button Text'
          }
        },

        {
          key: 'color',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Button Color',
            options: [
              {
                label: 'White',
                value: 'bg-white-600'
              },
              {
                label: 'Blue',
                value: 'bg-blue-600'
              },
              {
                label: 'Grey',
                value: 'bg-gray-600'
              },
              {
                label: 'Red',
                value: 'bg-red-600'
              },
              {
                label: 'Green',
                value: 'bg-green-600'
              },
              {
                label: 'Light Blue',
                value: 'bg-blue-200'
              },
              {
                label: 'Yellow',
                value: 'bg-yellow-600'
              },
              {
                label: 'Purple',
                value: 'bg-purple-600'
              },
              {
                label: 'Black',
                value: 'bg-black-600'
              },

            ]
          },
        },
        {
          key: 'onhover',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Button Color on Hover',
            options: [
              {
                label: 'White',
                value: 'hover:bg-white-400'
              },
              {
                label: 'Blue',
                value: 'hover:bg-blue-400'
              },
              {
                label: 'Grey',
                value: 'hover:bg-gray-400'
              },
              {
                label: 'Red',
                value: 'hover:bg-red-400'
              },
              {
                label: 'Green',
                value: 'hover:bg-green-400'
              },
              {
                label: 'Light Blue',
                value: 'hover:bg-blue-200'
              },
              {
                label: 'Yellow',
                value: 'hover:bg-yellow-400'
              },
              {
                label: 'Purple',
                value: 'hover:bg-purple-400'
              },
              {
                label: 'Black',
                value: 'hover:bg-black-300'
              },

            ]
          },
        },
        {
          key: 'btnIcon',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Button Icon'
          }
        },
        {
          key: 'format',
          type: 'select',
          className: "w-1/4 px-1",
          "wrappers": ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Button Position',
            options: [
              {
                label: 'Left',
                value: 'text-left'
              },
              {
                label: 'Right',
                value: 'text-right'
              },
              {
                label: 'Text Center',
                value: 'text-center'
              },
            ]
          },
        },
        {
          key: 'nzSize',
          type: 'select',
          className: "w-1/4 px-1",
          "wrappers": ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Size',
            options: [
              {
                label: 'large',
                value: 'large'
              },
              {
                label: 'small',
                value: 'small'
              },
              {
                label: 'default',
                value: 'default'
              },
            ]
          },
        },
        {
          key: 'trigger',
          type: 'select',
          className: "w-1/4 px-1",
          "wrappers": ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Trigger',
            options: [

              {
                label: 'Click',
                value: 'click'
              },
              {
                label: 'Hover',
                value: 'hover'
              },
            ]
          },
        },
        {
          key: 'placement',
          type: 'select',
          className: "w-1/4 px-1",
          "wrappers": ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Menu Placement',
            options: [

              {
                label: 'BottomLeft',
                value: 'bottomLeft'
              },
              {
                label: 'BottomCenter',
                value: 'bottomCenter'
              },
              {
                label: 'BottomRight',
                value: 'bottomRight'
              },
              {
                label: 'TopLeft',
                value: 'topLeft'
              },
              {
                label: 'TopCenter',
                value: 'topCenter'
              },
              {
                label: 'TopRight',
                value: 'topRight'
              },
            ]
          },
        },
        {
          className: "w-1/6 px-1 mt-3",
          key: 'disabled',
          type: 'checkbox',
          templateOptions: {
            label: 'Disabled',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-3",
          key: 'nzGhost',
          type: 'checkbox',
          templateOptions: {
            label: 'Ghost',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-3",
          key: 'visible',
          type: 'checkbox',
          templateOptions: {
            label: 'Visible',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-3",
          key: 'clickHide',
          type: 'checkbox',
          templateOptions: {
            label: 'Click Hide',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'nzBlock',
          type: 'checkbox',
          templateOptions: {
            label: 'Block',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-3",
          key: 'nzLoading',
          type: 'checkbox',
          templateOptions: {
            label: 'Loading',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-3",
          key: 'nzDanger',
          type: 'checkbox',
          templateOptions: {
            label: 'Danger',
          },
          defaultValue: false
        },
        {
          template: '<div class="bold-label mt-3">options</div>',
        },
        {
          key: 'options',
          type: 'repeatSection',
          className: "w-full",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            style: "margin-top: 6%;",
            canAdd: true,
            canRemove: true
          },
          fieldArray: {
            className: 'ml-3 me-2',
            fieldGroup: [
              {
                key: 'label',
                type: 'input',
                className: "ml-2",
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'label'
                }
              },
              {
                key: 'link',
                type: 'input',
                className: "ml-2",
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'link'
                }
              }
            ]
          }
        },
      ]
    },
  ]
  linkButtonFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          key: 'target',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Open Type',
            options: [
              {
                label: 'New Page',
                value: '_blank'
              },
              {
                label: 'Current Page',
                value: ''
              },
              {
                label: 'Modal',
                value: 'modal'
              },
              // {
              //   label: 'Modal Large',
              //   value: 'lg'
              // },
              // {
              //   label: 'Modal Extra Large',
              //   value: 'xl'
              // },
              // {
              //   label: 'Modal Fullscreen',
              //   value: 'fullscreen'
              // },
            ]
          },
        },
        {
          key: 'color',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Button Color',
            options: [
              {
                label: 'White',
                value: 'bg-white-600'
              },
              {
                label: 'Blue',
                value: 'bg-blue-600'
              },
              {
                label: 'Grey',
                value: 'bg-gray-600'
              },
              {
                label: 'Red',
                value: 'bg-red-600'
              },
              {
                label: 'Green',
                value: 'bg-green-600'
              },
              {
                label: 'Light Blue',
                value: 'bg-blue-200'
              },
              {
                label: 'Yellow',
                value: 'bg-yellow-600'
              },
              {
                label: 'Purple',
                value: 'bg-purple-600'
              },
              {
                label: 'Black',
                value: 'bg-black-600'
              },

            ]
          },
          defaultValue: 'bg-blue-200'
        },
        {
          key: 'onhover',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Button Color on Hover',
            options: [
              {
                label: 'White',
                value: 'hover:bg-white-400'
              },
              {
                label: 'Blue',
                value: 'hover:bg-blue-400'
              },
              {
                label: 'Grey',
                value: 'hover:bg-gray-400'
              },
              {
                label: 'Red',
                value: 'hover:bg-red-400'
              },
              {
                label: 'Green',
                value: 'hover:bg-green-400'
              },
              {
                label: 'Light Blue',
                value: 'hover:bg-blue-200'
              },
              {
                label: 'Yellow',
                value: 'hover:bg-yellow-400'
              },
              {
                label: 'Purple',
                value: 'hover:bg-purple-400'
              },
              {
                label: 'Black',
                value: 'hover:bg-black-300'
              },

            ]
          },
        },
        {
          key: 'format',
          type: 'select',
          className: "w-1/4 px-1",
          "wrappers": ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Button Format',
            options: [
              {
                label: 'Right',
                value: 'text-right'
              },
              {
                label: 'Left',
                value: 'text-left'
              },
              {
                label: 'Middle',
                value: 'text-center'
              },
            ]
          },
          defaultValue: ''
        },
        {
          key: 'nzShape',
          type: 'select',
          className: "w-1/4 px-1",
          "wrappers": ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Shape',
            options: [
              {
                label: 'Circle',
                value: 'circle'
              },
              {
                label: 'Round',
                value: 'round'
              },
              {
                label: 'default',
                value: 'default'
              },
            ]
          },
        },
        {
          key: 'btnIcon',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Button Icon'
          }
        },
        {
          key: 'href',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Link'
          }
        },
        {
          key: 'nzSize',
          type: 'select',
          className: "w-1/4 px-1",
          "wrappers": ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Size',
            options: [
              {
                label: 'large',
                value: 'large'
              },
              {
                label: 'small',
                value: 'small'
              },
              {
                label: 'default',
                value: 'default'
              },
            ]
          },
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'nzGhost',
          type: 'checkbox',
          templateOptions: {
            label: 'Ghost',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'nzBlock',
          type: 'checkbox',
          templateOptions: {
            label: 'Block',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'nzLoading',
          type: 'checkbox',
          templateOptions: {
            label: 'Loading',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'nzDanger',
          type: 'checkbox',
          templateOptions: {
            label: 'Danger',
          },
          defaultValue: false
        },

      ]
    },
  ]
  // //used in formly form
  // btnTextField: FormlyFieldConfig[] = [{
  //   key: 'title',
  //   type: 'input',
  //   templateOptions: {
  //     label: 'Button Text'
  //   }
  // }]
  //color Json
  colorFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          key: 'defaultValue',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Default Color',
            type: 'color'
            // value:"#038edc",
          },
        },
      ]
    },
  ]
  //card Fields
  cardFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          className: "w-1/4 px-1",
          key: 'link',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'link',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'icon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'icon',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'name',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Name'
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'total',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'Total'
          }
        },

        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-3",
        //   templateOptions: {
        //     label: 'Repeat'
        //   },
        // },
      ]
    },
  ]
  //Chart Fields
  chartFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          className: "w-1/4 px-1",
          key: 'sub_label',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Sub Label',
          }
        },

        {
          key: 'link',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Select Api',
            options: [
              {
                label: 'Chart Api',
                value: 'salesdata'
              }
            ]
          },
        },

        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-5",
        //   templateOptions: {
        //     label: 'Repeat'
        //   },
        // },
        {
          template: '<div class="bold-label mt-3">options</div>'
        },
        {
          key: 'options',
          type: 'repeatSection',
          templateOptions: {
            style: "margin-top: 6%;",
            canAdd: true,
            canRemove: true
          },
          fieldArray: {
            // className: 'ml-3 me-2',
            fieldGroup: [
              // {
              //   key: 'filtertype',
              //   type: 'input',
              //   className: "w-1/3",
              //   wrappers: ["formly-vertical-wrapper"],
              //   templateOptions: {
              //     label: 'Filtertype'
              //   }
              // },
              {
                key: 'price',
                type: 'input',
                className: "w-1/4 px-1",
                // wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'price'
                }
              },
              {
                key: 'data',
                type: 'input',
                className: "w-1/4 px-1",
                // wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Data'
                }
              },
              {
                key: 'colors',
                type: 'input',
                className: "w-1/4 px-1",
                // wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  type: "color",
                  label: 'Colors'
                }
              },
              // {
              //   // className: "ml-2",
              //   key: 'api',
              //   type: 'input',
              //   className: "col",
              //   wrappers: ["formly-vertical-wrapper"],
              //   templateOptions: {
              //     label: 'Api'
              //   }
              // },

            ]
          }
        },
        // {
        //   template: '<div class="bold-label mt-3">options</div>',
        // },
        // {
        //   key: 'options',
        //   type: 'multiRepeatSection',
        //   templateOptions: {
        //     canAdd: true,
        //     canRemove: true
        //   },
        //   fieldArray: {
        //     className: 'ml-3 me-2',
        //     fieldGroup: [
        //       {
        //         key: 'filtertype',
        //         type: 'input',
        //         className: "w-full",
        //         wrappers: ["formly-vertical-wrapper"],
        //         templateOptions: {
        //           canAdd: true,
        //           canRemove: true,
        //           label: 'Filter'
        //         },
        //         fieldArray: {
        //           fieldGroup: [
        //             {
        //               key: 'series',
        //               type: 'input',
        //               className: "w-1/3",
        //               wrappers: ["formly-vertical-wrapper"],
        //               templateOptions: {
        //                 type: 'number',
        //                 label: 'asdasd'
        //               }
        //             },
        //

        //             {
        //               key: 'color',
        //               type: 'input',
        //               className: "w-1/3",
        //               wrappers: ["formly-vertical-wrapper"],
        //               templateOptions: {
        //                 label: 'Color',
        //                 type: "color"
        //               }
        //             },
        //             {
        //               // className: "ml-2",
        //               key: 'api',
        //               type: 'input',
        //               className: "w-1/3",
        //               wrappers: ["formly-vertical-wrapper"],
        //               templateOptions: {
        //                 label: 'Api'
        //               }
        //             },
        //           ]
        //         }
        //       },
        //     ]
        //   }
        // },
      ]
    },
  ]
  donutChartFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [



        {
          key: 'link',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Select Api',
            options: [
              {
                label: 'Donut Chart',
                value: 'donutChart'
              }
            ]
          },
          // defaultValue: 'donutChart'
        },

        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-5",
        //   templateOptions: {
        //     label: 'Repeat'
        //   },
        // },
        {
          template: '<div class="bold-label mt-3">options</div>',
        },
        {
          key: 'options',
          type: 'repeatSection',
          templateOptions: {
            style: "margin-top:4% ",
            canAdd: true,
            canRemove: true
          },
          fieldArray: {
            className: 'ml-3 me-2',
            fieldGroup: [
              {
                key: 'series',
                type: 'input',
                className: "w-1/3",
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  type: 'number',
                  label: 'Series'
                }
              },

              {
                key: 'color',
                type: 'input',
                className: "w-1/3",
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Color',
                  type: "color"
                }
              },
              {
                // className: "ml-2",
                key: 'api',
                type: 'input',
                className: "w-1/3",
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Api'
                }
              },

            ]
          }
        },
      ]
    },
  ]
  donutSaleChartFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [



        {
          key: 'link',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Select Api',
            options: [
              {
                label: 'Donut Chart',
                value: 'donutChart'
              }
            ]
          },
          // defaultValue: 'donutChart'
        },
        {
          className: "w-1/4 px-1",
          key: 'thisTitle',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'This Title',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'lastTitle',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Last Title',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'prevTitle',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Prev Title',
          }
        },

        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-5",
        //   templateOptions: {
        //     label: 'Repeat'
        //   },
        // },
        {
          template: '<div class="bold-label mt-3">options</div>'
        },
        {
          key: 'options1',
          type: 'repeatSection',
          templateOptions: {
            style: "margin-top:4%;",
            canAdd: true,
            canRemove: true
          },
          fieldArray: {
            className: 'ml-3 me-2',
            fieldGroupClassName: "flex flex-wrap",
            fieldGroup: [
              {
                className: "w-1/3",
                key: 'thisValue',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'This Value',
                }
              },
              {
                className: "w-1/3",
                key: 'growth',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Growth',
                }
              },
              {
                className: "w-1/3",
                key: 'lastValue',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Last Value',
                }
              },
              {
                className: "w-1/3",
                key: 'prevValue',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Prev Value',
                }
              },
            ]
          },
        },
        {
          template: '<div class="bold-label mt-3">options</div>'
        },
        {
          key: 'options',
          type: 'repeatSection',
          templateOptions: {
            style: "margin-top:4%;",
            canAdd: true,
            canRemove: true
          },
          fieldArray: {
            className: 'ml-3 me-2',
            fieldGroupClassName: "flex flex-wrap",
            fieldGroup: [
              {
                className: "w-1/3",
                key: 'series',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  type: "number",
                  label: 'Series'
                }
              },

              {
                className: "w-1/3",
                key: 'color',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  type: "color",
                  label: 'Color'
                }
              },

              {
                className: "w-1/3",
                key: 'api',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Api'
                }
              },
              // {
              //   key: 'Direct',
              //   type: 'input',
              //   wrappers: ["formly-vertical-wrapper"],
              //   templateOptions: {
              //     label: 'Direct Label'
              //   }
              // },
              // {
              //   key: 'Others',
              //   type: 'input',
              //   wrappers: ["formly-vertical-wrapper"],
              //   templateOptions: {
              //     label: 'Other Label'
              //   }
              // },


            ]
          },
        },
      ]
    },
  ]
  browserChartFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          key: 'defaultColor',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Default Color',
            options: [
              {
                label: 'Blue',
                value: 'bg-primary'
              },
              {
                label: 'Green',
                value: 'bg-success'
              },
              {
                label: 'Light Blue',
                value: 'bg-info'
              },
              {
                label: 'Yellow',
                value: 'bg-warning'
              },
              {
                label: 'Red',
                value: 'bg-danger'
              },
              {
                label: 'Gray',
                value: 'bg-secondary'
              },
              {
                label: 'White',
                value: 'bg-white'
              },
              {
                label: 'Muted',
                value: 'bg-muted'
              },
              {
                label: 'Dark',
                value: 'bg-dark'
              },
            ]
          },
          // defaultValue: 'w-1/3'
        },
        {
          className: "w-1/4 px-1",
          key: 'belowpercentage',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: "number",
            label: 'Below Percentage',
          }
        },
        {
          key: 'below_percentage_color',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Below Percentage Color',
            options: [
              {
                label: 'Blue',
                value: 'bg-primary'
              },
              {
                label: 'Green',
                value: 'bg-success'
              },
              {
                label: 'Light Blue',
                value: 'bg-info'
              },
              {
                label: 'Yellow',
                value: 'bg-warning'
              },
              {
                label: 'Red',
                value: 'bg-danger'
              },
              {
                label: 'Gray',
                value: 'bg-secondary'
              },
              {
                label: 'White',
                value: 'bg-white'
              },
              {
                label: 'Muted',
                value: 'bg-muted'
              },
              {
                label: 'Dark',
                value: 'bg-dark'
              },
            ]
          },
          // defaultValue: 'w-1/3'
        },
        {
          className: "w-1/4 px-1",
          key: 'icon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Icon',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'limit',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'Limit',
          }
        },

        {
          key: 'link',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Select Api',
            options: [
              {
                label: "Browser Chart Api",
                value: "browserdata"
              },
            ]
          },
          // defaultValue: 'browserdata'
        },

        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-3",
        //   templateOptions: {
        //     label: 'Repeat'
        //   },
        // },
        {
          template: '<div class="bold-label mt-3">options</div>',
        },
        {
          key: 'options',
          type: 'repeatSection',
          templateOptions: {
            style: "margin-top:4%",
            canAdd: true,
            canRemove: true
          },
          fieldArray: {
            // className: 'ml-3 me-2',
            fieldGroup: [
              // {
              //   key: 'name',
              //   type: 'input',
              //   wrappers: ["formly-vertical-wrapper"],
              //   templateOptions: {
              //     label: 'Title'
              //   }
              // },
              {
                key: 'percentage',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'percentage'
                }
              },
              {
                key: 'min',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'min'
                }
              },
              {
                key: 'max',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'max'
                }
              },
              {
                key: 'bar',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'bar'
                }
              },
              {
                key: 'api',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Api'
                }
              },

            ]
          }
        },

      ]
    },
  ]
  browserComibeChartFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          key: 'defaultColor',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Default Color',
            options: [
              {
                label: 'Blue',
                value: 'bg-primary'
              },
              {
                label: 'Green',
                value: 'bg-success'
              },
              {
                label: 'Light Blue',
                value: 'bg-info'
              },
              {
                label: 'Yellow',
                value: 'bg-warning'
              },
              {
                label: 'Red',
                value: 'bg-danger'
              },
              {
                label: 'Gray',
                value: 'bg-secondary'
              },
              {
                label: 'White',
                value: 'bg-white'
              },
              {
                label: 'Muted',
                value: 'bg-muted'
              },
              {
                label: 'Dark',
                value: 'bg-dark'
              },
            ]
          },
          // defaultValue: 'w-1/3'
        },
        {
          className: "w-1/4 px-1",
          key: 'numberofcolumns',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: "number",
            label: 'Number Of Columns',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'belowpercentage',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: "number",
            label: 'Below Percentage',
          }
        },
        {
          key: 'below_percentage_color',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Below Percentage Color',
            options: [
              {
                label: 'Blue',
                value: 'bg-primary'
              },
              {
                label: 'Green',
                value: 'bg-success'
              },
              {
                label: 'Light Blue',
                value: 'bg-info'
              },
              {
                label: 'Yellow',
                value: 'bg-warning'
              },
              {
                label: 'Red',
                value: 'bg-danger'
              },
              {
                label: 'Gray',
                value: 'bg-secondary'
              },
              {
                label: 'White',
                value: 'bg-white'
              },
              {
                label: 'Muted',
                value: 'bg-muted'
              },
              {
                label: 'Dark',
                value: 'bg-dark'
              },
            ]
          },
          // defaultValue: 'w-1/3'
        },
        {
          className: "w-1/4 px-1",
          key: 'icon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Icon',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'limit',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'Limit',
          }
        },


        {
          key: 'link',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Select Api',
            options: [
              {
                label: "Browser Chart Api",
                value: "browserdata"
              },
            ]
          },
          // defaultValue: 'browserdata'
        },



        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-5",
        //   templateOptions: {
        //     label: 'Repeat'
        //   },
        // },

        {
          template: '<div class="bold-label mt-3">options</div>',
        },
        {
          key: 'options',
          type: 'repeatSection',
          templateOptions: {
            style: "margin-top: 5%;",
            canAdd: true,
            canRemove: true
          },
          fieldArray: {
            className: 'ml-3 me-2',
            fieldGroup: [
              {
                key: 'name',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Title'
                }
              },
              {
                key: 'percentage',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'percentage'
                }
              },
              {
                key: 'min',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'min'
                }
              },
              {
                key: 'max',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'max'
                }
              },
              {
                key: 'bar',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'bar'
                }
              },
              {
                // className: "ml-2",
                key: 'api',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Api'
                }
              },

            ]
          }
        },

      ]
    },
  ]
  widgetSectionChartFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          className: "w-1/4 px-1",
          key: 'limit',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'Limit',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'percentage',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'Below Percentage',
          }
        },
        {
          key: 'below_percentage_color',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Below Percentage Color',
            options: [
              {
                label: 'Red',
                value: 'danger'
              },
              {
                label: 'Yellow',
                value: 'warning'
              },
              {
                label: 'Blue',
                value: 'primary'
              },
              {
                label: 'Gray',
                value: 'secondary'
              },
              {
                label: 'Green',
                value: 'success'
              },
              {
                label: 'Light Blue',
                value: 'info'
              },
            ]
          },
          // defaultValue: 'danger'
        },
        {
          key: 'link',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Select Api',
            options: [
              {
                label: "Widget Section Chart Api",
                value: "widgetChart"
              },
            ]
          },
        },




        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-5",
        //   templateOptions: {
        //     label: 'Repeat'
        //   },
        // },
        {
          template: '<div class="bold-label mt-3">options</div>',
        },
        {
          key: 'options',
          type: 'repeatSection',
          templateOptions: {
            style: "margin-top:4%",
            canAdd: true,
            canRemove: true
          },
          fieldArray: {
            className: 'ml-3 me-2',
            fieldGroup: [
              {
                key: 'name',
                type: 'input',
                className: 'col',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Title'
                }
              },
              {
                key: 'total',
                type: 'input',
                className: 'col',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'total'
                }
              },
              {
                key: 'percentage',
                type: 'input',
                className: 'col',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'percentage'
                }
              },
              {
                key: 'data',
                type: 'input',
                className: 'col',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'data'
                }
              },
              {
                key: 'api',
                type: 'input',
                className: 'col',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Api'
                }
              },

            ]
          }
        },

      ]
    },
  ]
  SectionChartFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          className: "w-1/4 px-1",
          key: 'limit',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'Limit',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'percentage',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'Below Percentage',
          }
        },
        {
          key: 'below_percentage_color',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Below Percentage Color',
            options: [
              {
                label: 'Red',
                value: 'danger'
              },
              {
                label: 'Yellow',
                value: 'warning'
              },
              {
                label: 'Blue',
                value: 'primary'
              },
              {
                label: 'Gray',
                value: 'secondary'
              },
              {
                label: 'Green',
                value: 'success'
              },
              {
                label: 'Light Blue',
                value: 'info'
              },
            ]
          },
          // defaultValue: 'danger'
        },


        {
          key: 'link',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Select Api',
            options: [
              {
                label: "Widget Section Chart Api",
                value: "widgetSecondCard"
              },
            ]
          },
          // defaultValue:"widgetSecondCard",
        },

        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-5",
        //   templateOptions: {
        //     label: 'Repeat'
        //   },
        // },
        {
          template: '<div class="bold-label mt-3">options</div>',
        },
        {
          key: 'options',
          type: 'repeatSection',
          templateOptions: {
            style: "margin-top:4%;",
            canAdd: true,
            canRemove: true
          },
          fieldArray: {
            fieldGroupClassName: "flex flex-wrap",
            fieldGroup: [
              {
                className: "col",
                key: 'name',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Title'
                }
              },
              {
                className: "col",
                // className: "ml-2",
                key: 'icon',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Icon'
                }
              },
              // {
              //   className: "w-1/6 px-1",
              //   // className: "ml-2",
              //   key: 'icon',
              //   type: 'input',
              //   wrappers: ["formly-vertical-wrapper"],
              //   templateOptions: {
              //     label: 'Icon'
              //   }
              // },
              {
                className: "col",
                // className: "ml-2",
                key: 'total',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'total'
                }
              },
              {
                className: "col",
                // className: "ml-2",
                key: 'percentage',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'percentage'
                }
              },
              {
                className: "col",
                // className: "ml-2",
                key: 'api',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Api'
                }
              },
            ]
          }
        },

        // {
        //   className: "w-1/4 px-1",
        //   key: 'icon',
        //   type: 'input',
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     label: 'Icon'
        //   }
        // },
        // {
        //   className: "w-1/4 px-1",
        //   key: 'name',
        //   type: 'input',
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     label: 'Name'
        //   }
        // },
        // {
        //   className: "w-1/4 px-1",
        //   key: 'total',
        //   type: 'input',
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     label: 'Total'
        //   }
        // },
        // {
        //   className: "w-1/4 px-1",
        //   key: 'percentage',
        //   type: 'input',
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     label: 'Percentage'
        //   }
        // },
      ]
    },
  ]
  saleAnalyticsChartFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          key: 'link',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Select Api',
            options: [
              {
                label: "Analytics Chart Api",
                value: "analyticsChart"
              },
            ]
          },
          // defaultValue: "analyticsChart",
        },

        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-5",
        //   templateOptions: {
        //     label: 'Repeat'
        //   },
        // },
        {
          template: '<div class="bold-label mt-3">options</div>'
        },
        {
          key: 'options',
          type: 'repeatSection',
          templateOptions: {
            style: "margin-top: 4%;",
            canAdd: true,
            canRemove: true
          },
          fieldArray: {
            fieldGroupClassName: "flex flex-wrap",
            fieldGroup: [
              {
                className: "w-1/3 px-1",
                key: 'name1',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Label'
                }
              },
              {
                className: "w-1/3 px-1",
                key: 'value',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Value'
                }
              },
              {
                className: "w-1/3 px-1",
                key: 'name',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Title'
                }
              },
              {
                className: "w-1/3 px-1",
                // className: "ml-2",
                key: 'data',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'data'
                }
              },
              {
                key: 'type',
                type: 'select',
                className: "w-1/3 px-1",
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Graph',
                  options: [
                    {
                      label: 'Column',
                      value: 'column'
                    },
                    {
                      label: 'Area',
                      value: 'area'
                    },
                    {
                      label: 'Line',
                      value: 'line'
                    },
                  ]
                },
                // defaultValue: 'w-1/3'
              },
              {
                className: "w-1/3 px-1",
                // className: "ml-2",
                key: 'api',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Api'
                }
              },

            ]
          }
        },

      ]
    },
  ]
  //Heading Field
  headingFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [


        {
          key: 'heading',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Heading Level',
            options: [
              {
                label: 'Default',
                value: 'text-sm'
              },
              {
                label: 'h1',
                value: 'text-4xl'
              },
              {
                label: 'h2',
                value: 'text-3xl'
              },
              {
                label: 'h3',
                value: 'text-2xl'
              },
              {
                label: 'h4',
                value: 'text-xl'
              },
              {
                label: 'h5',
                value: 'text-lg'
              },
              {
                label: 'h6',
                value: 'text-base'
              },
            ]
          },
          // defaultValue: 'w-1/3'
        },
        {
          key: 'fontstyle',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Font Weight',
            options: [
              {
                label: 'Bold',
                value: 'font-bold'
              },
              {
                label: 'Italic',
                value: 'italic'
              },
              {
                label: 'Normal',
                value: 'font-normal'
              },
            ]
          },
          // defaultValue: 'w-1/3'
        },

        {
          className: "w-1/4 px-1",
          key: 'color',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'color',
            label: 'Heading Color',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'headingApi',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {

            label: 'Heading Api',
          }
        },

        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-3",
        //   templateOptions: {
        //     label: 'Repeat'
        //   },
        // },
        {
          className: "w-full",
          key: 'text',
          type: 'textarea',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Text',
            rows: 3
          }
        },

      ]
    },
  ]
  paragraphFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          key: 'style',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Font Weight',
            options: [
              {
                label: 'Bold',
                value: 'font-weight:bold;'
              },
              {
                label: 'Italic',
                value: 'font-style:italic;'
              },
              {
                label: 'Normal',
                value: 'font-weight:normal;'
              },
            ]
          },
          // defaultValue: 'w-1/3'
        },
        {
          key: 'textAlignment',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Text Alignment',
            options: [
              {
                label: 'Left',
                value: 'text-align:left;'
              },
              {
                label: 'Right',
                value: 'text-align:right;'
              },
              {
                label: 'Center',
                value: 'text-align:center;'
              },
              {
                label: 'justify',
                value: 'text-align:justify;;'
              },
            ]
          },
        },
        {
          className: "w-1/4 px-1",
          key: 'color',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'color',
            label: 'Paragraph Color',
          }
        },


        // {
        //   key: 'api',
        //   type: 'select',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     label: 'APi',
        //     options: [
        //       {
        //         label: 'APi',
        //         value: 'paragrapApi'
        //       },
        //     ]
        //   },
        // },

        // {
        //   className: "w-1/4 px-1",
        //   key: 'padding',
        //   type: 'input',
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     label: 'Padding',
        //     placeholder: "0px 0px 0px 0px",
        //   }
        // },
        // {
        //   className: "w-1/4 px-1",
        //   key: 'paddingLeft',
        //   type: 'input',
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     type:'number',
        //     label: 'Padding Left',
        //   }
        // },
        // {
        //   className: "w-1/4 px-1",
        //   key: 'paddingRight',
        //   type: 'input',
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     type:'number',
        //     label: 'Padding Right',
        //   }
        // },
        // {
        //   className: "w-1/4 px-1",
        //   key: 'paddingTop',
        //   type: 'input',
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     type:'number',
        //     label: 'Padding Top',
        //   }
        // },
        // {
        //   className: "w-1/4 px-1",
        //   key: 'paddingBottom',
        //   type: 'input',
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     type:'number',
        //     label: 'Padding Bottom',
        //   }
        // },

        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-5",
        //   templateOptions: {
        //     label: 'Repeat'
        //   },
        // },
        {
          className: "w-full",
          key: 'text',
          type: 'textarea',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Text',
            rows: 3
          }
        },
      ]
    },
  ]
  //Card Json
  customMaskingFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'maskString',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Mask Format',
            placeholder: 'e.g "xxxx-xxxx"',
          }
        },
      ]
    }
  ]
  stepperFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          key: 'icon',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'icon',
          }
        },
        {
          key: 'label',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Title',
          }
        },
        {
          key: 'subtitle',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Subtitle'
          },
        },
        {
          key: 'description',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'description',
          }
        },
        {
          key: 'percentage',
          type: 'number',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'percentage',
          }
        },
        {
          key: 'status',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Status',
            options: [
              {
                label: 'wait',
                value: 'wait'
              },
              {
                label: 'process',
                value: 'process'
              },
              {
                label: 'finish',
                value: 'finish'
              },
              {
                label: 'error',
                value: 'error'
              },
            ]
          }
        },
        {
          key: 'disabled',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-3",
          templateOptions: {
            label: 'disabled'
          },
        },
      ]
    },
  ]
  mainStepperFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          key: 'selectedIndex',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'Selected Index',
          }
        },
        {
          key: 'direction',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Direction',
            options: [
              {
                label: 'vertical',
                value: 'vertical'
              },
              {
                label: 'horizontal',
                value: 'horizontal'
              },
            ]
          }
        },
        {
          key: 'stepperType',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Stepper Type',
            options: [
              {
                label: 'default',
                value: 'default'
              },
              {
                label: 'navigation',
                value: 'navigation'
              },
            ]
          }
        },
        {
          key: 'placement',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Label placement',
            options: [
              {
                label: 'vertical',
                value: 'vertical'
              },
              {
                label: 'horizontal',
                value: 'horizontal'
              },
            ]
          }
        },
        {
          key: 'size',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Size',
            options: [
              {
                label: 'small',
                value: 'small'
              },
              {
                label: 'default',
                value: 'default'
              },
            ]
          }
        },
        {
          key: 'status',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Status',
            options: [
              {
                label: 'wait',
                value: 'wait'
              },
              {
                label: 'process',
                value: 'process'
              },
              {
                label: 'finish',
                value: 'finish'
              },
              {
                label: 'error',
                value: 'error'
              },
            ]
          }
        },
        {
          key: 'nodes',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'Number of Steppers',
          }
        },
        // {
        //   key: 'stepperFormat',
        //   type: 'select',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     label: 'Stepper Format',
        //     options: [
        //       {
        //         label: 'Vertical',
        //         value: 'vertical'
        //       },
        //       {
        //         label: 'Horizental',
        //         value: 'horizental'
        //       },
        //     ],
        //   },
        // },
        // {
        //   key: 'selectColor',
        //   type: 'input',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     type: 'color',
        //     label: 'Select Color',
        //   }
        // },
        // {
        //   key: 'defaultColor',
        //   type: 'input',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     type: 'color',
        //     label: 'Default Color',
        //   }
        // },


        // {
        //   key: 'nextButtonText',
        //   type: 'input',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     label: 'Next Button Text',
        //   }
        // },
        // {
        //   key: 'nextButtonIcon',
        //   type: 'input',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     label: 'Next Button Icon',
        //   }
        // },
        // {
        //   key: 'nextButtonColor',
        //   type: 'select',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     label: 'Next Button Color',
        //     options: [
        //       {
        //         label: 'Blue',
        //         value: 'btn btn-primary'
        //       },
        //       {
        //         label: 'Gray',
        //         value: 'btn btn-secondary'
        //       },
        //       {
        //         label: 'Green',
        //         value: 'btn btn-success'
        //       },
        //       {
        //         label: 'Red',
        //         value: 'btn btn-danger'
        //       },
        //       {
        //         label: 'Yellow',
        //         value: 'btn btn-warning'
        //       },
        //       {
        //         label: 'Light blue',
        //         value: 'btn btn-info'
        //       },
        //       {
        //         label: 'White',
        //         value: 'btn btn-light'
        //       },
        //       {
        //         label: 'Black',
        //         value: 'btn btn-dark'
        //       },


        //     ],
        //   },
        // },
        // {
        //   key: 'backButtonText',
        //   type: 'input',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     label: 'Back Button Text',
        //   }
        // },
        // {
        //   key: 'backButtonIcon',
        //   type: 'input',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     label: 'Back Button Icon',
        //   }
        // },
        // {
        //   key: 'backButtonColor',
        //   type: 'select',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     label: 'Back Button Color',
        //     options: [
        //       {
        //         label: 'Blue',
        //         value: 'btn btn-primary mr-2'
        //       },
        //       {
        //         label: 'Gray',
        //         value: 'btn btn-secondary mr-2'
        //       },
        //       {
        //         label: 'Green',
        //         value: 'btn btn-success mr-2'
        //       },
        //       {
        //         label: 'Red',
        //         value: 'btn btn-danger mr-2'
        //       },
        //       {
        //         label: 'Yellow',
        //         value: 'btn btn-warning mr-2'
        //       },
        //       {
        //         label: 'Light blue',
        //         value: 'btn btn-info mr-2'
        //       },
        //       {
        //         label: 'White',
        //         value: 'btn btn-light mr-2'
        //       },
        //       {
        //         label: 'Black',
        //         value: 'btn btn-dark mr-2'
        //       },
        //     ],
        //   },
        // },
        // {
        //   key: 'submitButtonText',
        //   type: 'input',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     label: 'Submit Button Text',
        //   }
        // },
        // {
        //   key: 'submitButtonIcon',
        //   type: 'input',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     label: 'Submit Button Icon',
        //   }
        // },
        // {
        //   key: 'submitButtonColor',
        //   type: 'select',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     label: 'Submit Button Color',
        //     options: [
        //       {
        //         label: 'Blue',
        //         value: 'btn btn-primary'
        //       },
        //       {
        //         label: 'Gray',
        //         value: 'btn btn-secondary'
        //       },
        //       {
        //         label: 'Green',
        //         value: 'btn btn-success'
        //       },
        //       {
        //         label: 'Red',
        //         value: 'btn btn-danger'
        //       },
        //       {
        //         label: 'Yellow',
        //         value: 'btn btn-warning'
        //       },
        //       {
        //         label: 'Light blue',
        //         value: 'btn btn-info'
        //       },
        //       {
        //         label: 'White',
        //         value: 'btn btn-light'
        //       },
        //       {
        //         label: 'Black',
        //         value: 'btn btn-dark'
        //       },


        //     ],
        //   },
        // },
        // {
        //   key: 'disabled',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-3",
        //   templateOptions: {
        //     label: 'Disabled'
        //   },
        // },
      ]
    },
  ]
  tabFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        // {
        //   key: 'stepperText',
        //   type: 'input',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     label: 'Label',
        //     pattern: '^\\S*$',
        //   }
        // },
        {
          key: 'stepperLabel',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Label',
          }
        },
        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-5",
        //   templateOptions: {
        //     label: 'Repeat'
        //   },
        // },
        // {
        //   key: 'stepperFormat',
        //   type: 'select',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     label: 'Stepper Format',
        //     options: [
        //       {
        //         label: 'Vertical',
        //         value: 'vertical'
        //       },
        //       {
        //         label: 'Horizental',
        //         value: 'horizental'
        //       },
        //     ],
        //   },
        // },
      ]
    },
  ]
  tabsFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          key: 'icon',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Icon',
          }
        },
      ]
    },
  ]
  mainTabFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          key: 'selectedIndex',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'selectedIndex',
          }
        },
        {
          key: 'tabPosition',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'tabPosition',
            options: [
              {
                label: 'top',
                value: 'top'
              },
              {
                label: 'right',
                value: 'right'
              },
              {
                label: 'bottom',
                value: 'bottom'
              },
              {
                label: 'left',
                value: 'left'
              },
            ],
          },
        },
        {
          key: 'nodes',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'Number of Nodes',
          }
        },
        {
          key: 'tabType',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Tab type',
            options: [
              {
                label: 'line',
                value: 'line'
              },
              {
                label: 'card',
                value: 'card'
              },
              {
                label: 'editable-card',
                value: 'editable-card'
              },

            ]
          },
        },
        {
          key: 'hideTabs',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'Hidetabs'
          },
        },
        {
          key: 'animated',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'Animated'
          },
        },
        {
          key: 'centerd',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'centerd'
          },
        },
      ]
    },
  ]
  menuBuilderTabFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          key: 'icon',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Icon',
          }
        },
        {
          key: 'link',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Link',
          }
        },
      ]
    },
  ]

  fixedDivFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
      ]
    },
  ]
  accordionButtonFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          key: 'nzExpandedIcon',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Expanded Icon',
          }
        },
        {
          key: 'extra',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Extra',
          }
        },
        {
          key: 'nzExpandIconPosition',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Expanded Icon',
            options: [
              {
                label: 'Left',
                value: 'left'
              },
              {
                label: 'Right',
                value: 'right'
              },
            ],
          }
        },
        {
          key: 'nzBordered',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'Bordered'
          },
          defaultValue: false
        },
        {
          key: 'nzGhost',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'Transparent'
          },
          defaultValue: false
        },
        {
          key: 'nzDisabled',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'Disables'
          },
          defaultValue: false
        },
        {
          key: 'nzShowArrow',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'Show arrow'
          },
          defaultValue: false
        },
      ]

    },
  ]
  //For Page Section
  pageFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          template: '<div class="mt-3">Variables</div>'
        },
        {
          key: 'variables',
          type: 'repeatSection',
          templateOptions: {
            canAdd: true,
            canRemove: true
          },
          fieldArray: {
            className: 'ml-3 me-2',
            fieldGroup: [
              {
                key: 'variableName',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Variable Name',
                  pattern: '^\\S*$'
                }
              },
              {
                key: 'variableType',
                type: 'select',
                className: "w-1/4 px-1",
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Variable Type',
                  options: [
                    {
                      label: 'String',
                      value: 'string'
                    },
                    {
                      label: 'Number',
                      value: 'number'
                    },
                    {
                      label: 'Decimal',
                      value: 'decimal'
                    }
                  ],
                },
              },
            ]
          }
        },
        {
          template: '<div class="mb-3"></div>'
        },
      ]
    },
  ]
  pageHeaderFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          key: 'headingSize',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Heading Size',
            options: [
              {
                label: 'h1',
                value: 'text-xl'
              },
              {
                label: 'h2',
                value: 'text-lg'
              },
              {
                label: 'h3',
                value: 'text-base'
              },
              {
                label: 'h4',
                value: 'text-md'
              },
              {
                label: 'h5',
                value: 'text-sm'
              },
              {
                label: 'h6',
                value: 'text-xs'
              },
            ],
          },
        },
        {
          key: 'alertPosition',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            defaultValue: 'topHeader',
            label: 'Alert Position',
            options: [
              {
                label: 'Top on Header',
                value: 'topHeader'
              },
              {
                label: 'Inside Header',
                value: 'inside'
              },
              {
                label: 'Bottom of Header',
                value: 'bottomHeader'
              },
            ],
          },
        },
        {
          key: 'header',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'Enable Header'
          },
          defaultValue: false
        },
      ]
    },
  ]
  pageBodyFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

      ]
    },
  ]
  pageFooterFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          key: 'footer',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'Enable Footer'
          },
          defaultValue: false
        },
      ]
    },
  ]
  accordingFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        // {
        //   key: 'accordingText',
        //   type: 'input',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     label: 'Label',
        //     pattern: '^\\S*$',
        //   }
        // },
        {
          key: 'wrappers',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Format',
            options: [
              {
                label: 'Horizental',
                value: 'form-field-horizontal'
              },
              {
                label: 'Vertical',
                value: 'formly-vertical-wrapper'
              },
              {
                label: 'Vertical Theme',
                value: 'formly-vertical-theme-wrapper'
              },
              {
                label: 'Floating Input',
                value: 'floatingInput'
              },
              // {
              //   label: 'Grid Theme',
              //   value: 'formly-grid-wrapper'
              // },
            ],
          },
          // defaultValue: 'Vertical'
        },
        {
          key: 'labelPosition',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Label Position',
            options: [
              {
                label: 'Right',
                value: 'text-right'
              },
              {
                label: 'Center',
                value: 'text-center'
              },
              {
                label: 'Left',
                value: 'text-left'
              },
            ]
          },
        },
        {
          key: 'disabled',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Disabled',
            options: [
              {
                label: 'Editable',
                value: 'editable'
              },
              {
                label: 'Disabled',
                value: 'disabled'
              },
              {
                label: 'Disabled but Editable',
                value: 'disabled-But-ditable'
              },
              {
                label: 'Data only',
                value: 'data-only'
              },
              // {
              //   label: 'Grid Theme',
              //   value: 'formly-grid-wrapper'
              // },
            ],
          },
          // defaultValue: 'Vertical'
        },
        // {
        //   key: 'disabled',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-2",
        //   templateOptions: {
        //     label: 'Disabled'
        //   },
        // },

        // {
        //   key: 'isExpanded',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-2",
        //   templateOptions: {
        //     label: 'Is Collepse'
        //   },
        // },
        // {
        //   key: 'footer',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-2",
        //   templateOptions: {
        //     label: 'Enable Footer'
        //   },
        //   defaultValue: false
        // },
        // {
        //   key: 'header',
        //   type: 'checkbox',
        //   className: "w-1/3 mt-2",
        //   templateOptions: {
        //     label: 'Enable Header'
        //   },
        //   defaultValue: false
        // }
        {
          key: 'repeatable',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'Repeatable '
          },
        },
        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-5",
        //   templateOptions: {
        //     label: 'Repeat'
        //   },
        // },
      ]
    },
  ]
  accordingHeaderFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          key: 'labelPosition',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Label Position',
            options: [
              {
                label: 'Right',
                value: 'text-right pt-3'
              },
              {
                label: 'Left',
                value: 'text-left pt-3'
              },
              {
                label: 'Center',
                value: 'text-center pt-3'
              },
            ],
          },
        },
        {
          key: 'headingSize',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Heading Size',
            options: [
              {
                label: 'Default',
                value: ''
              },
              {
                label: 'h1',
                value: 'h1'
              },
              {
                label: 'h2',
                value: 'h2'
              },
              {
                label: 'h3',
                value: 'h3'
              },
              {
                label: 'h4',
                value: 'h4'
              },
              {
                label: 'h5',
                value: 'h5'
              },
              {
                label: 'h6',
                value: 'h6'
              },
            ],
          },
        },
        {
          className: "w-1/4 px-1",
          key: 'backGroundColor',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Back Ground Color',
            type: 'color',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'textColor',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Text Color',
            type: 'color',
          }
        },
        {
          key: 'header',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'Enable Header'
          },
          defaultValue: false
        },
        {
          key: 'expanded',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'Is Collapse'
          },
          defaultValue: false,
        },
        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-3",
        //   templateOptions: {
        //     label: 'Repeat'
        //   },
        // },
      ]
    },
  ]
  accordingBodyFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-5",
        //   templateOptions: {
        //     label: 'Repeat'
        //   },
        // },
      ]
    },
  ]
  accordingFooterFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          key: 'footer',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'Enable Footer'
          },
          defaultValue: false
        },
        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-5",
        //   templateOptions: {
        //     label: 'Repeat'
        //   },
        // },
      ]
    },
  ]
  switchFeilds: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          key: 'size',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Size',
            options: [
              {
                label: 'Default',
                value: 'default'
              },
              {
                label: 'Small',
                value: 'small'
              },

            ]
          },
        },
        {
          className: "w-1/4 px-1",
          key: 'checkedChildren',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Checked Content'
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'unCheckedChildren',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Un Checked Content'
          }
        },
        {
          key: 'disabled',
          type: 'checkbox',
          className: "w-1/4 px-1",
          templateOptions: {
            label: 'Disabled'
          },
          defaultValue: false
        },
        {
          key: 'loading',
          type: 'checkbox',
          className: "w-1/4 px-1",
          templateOptions: {
            label: 'Loading'
          },
          defaultValue: false
        },
        {
          key: 'control',
          type: 'checkbox',
          className: "w-1/4 px-1",
          templateOptions: {
            label: 'Control'
          },
          defaultValue: false
        },
      ]
    },
  ]
  progressBarFeilds: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'value',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Value'
          }
        },
        {
          key: 'color',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Color',
            options: [
              {
                label: 'Blue',
                value: 'primary'
              },
              {
                label: 'Green',
                value: 'success'
              },
              {
                label: 'Light Blue',
                value: 'info'
              },
              {
                label: 'Purple',
                value: 'purple'
              },
              {
                label: 'Yellow',
                value: 'warning'
              },
              {
                label: 'Red',
                value: 'danger'
              },
              {
                label: 'Gray',
                value: 'secondary'
              },
              {
                label: 'Dark',
                value: 'dark'
              },
            ]
          },
        },
        {
          className: "w-1/4 px-1",
          key: 'height',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'Height'
          }
        },
        {
          key: 'link',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'API',
            options: [
              {
                label: 'Link 1',
                value: 'progressBarOne'
              },
              {
                label: 'Link 2',
                value: 'progressBarTwo'
              },
            ]
          }
        },


        {
          key: 'showValue',
          type: 'checkbox',
          className: "col mt-5",
          templateOptions: {
            label: 'Show Value'
          },
          defaultValue: false
        },
        {
          key: 'stripped',
          type: 'checkbox',
          className: "col mt-5",
          templateOptions: {
            label: 'Show stripped'
          },
        },
        {
          key: 'animated',
          type: 'checkbox',
          className: "col mt-5",
          templateOptions: {
            label: 'Show Animated'
          },
        },

        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "col mt-5",
        //   templateOptions: {
        //     label: 'Repeat'
        //   },
        // },

      ]
    },
  ]
  dividerFeilds: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'dividerText',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Divider Text'
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'icon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Icon'
          }
        },
        {
          key: 'dividerType',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Divider Type',
            options: [
              {
                label: 'horizontal',
                value: 'horizontal'
              },
              {
                label: 'vertical',
                value: 'vertical'
              },
            ]
          },
        },
        {
          key: 'orientation',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Orientation',
            options: [
              {
                label: 'Center',
                value: 'center'
              },
              {
                label: 'Left',
                value: 'left'
              },
              {
                label: 'Right',
                value: 'right'
              },
            ]
          },
        },
        {
          key: 'dashed',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'Dashed'
          },
          defaultValue: false,
        },
        {
          key: 'plain',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'Plain'
          },
          defaultValue: false,
        },
      ]
    },
  ]
  sharedMessagesChartFeilds: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          className: "w-1/4 px-1",
          key: 'labelIcon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Label Icon',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'heading',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Heading'
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'headingIcon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Heading Icon'
          }
        },
        {
          key: 'headingColor',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Heading Color',
            options: [
              {
                label: 'Blue',
                value: 'text-primary'
              },
              {
                label: 'Gray',
                value: 'text-secondary'
              },
              {
                label: 'Green',
                value: 'text-success'
              },
              {
                label: 'Yellow',
                value: 'text-warning'
              },
              {
                label: 'Red',
                value: 'text-danger'
              },
              {
                label: 'Black',
                value: 'text-dark'
              },
              {
                label: 'White',
                value: 'text-white'
              },
              {
                label: 'Light White',
                value: 'text-light'
              },
              {
                label: 'Light Blue',
                value: 'text-info'
              },
            ]
          },
        },
        {
          className: "w-1/4 px-1",
          key: 'subHeading',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Sub Heading'
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'subHeadingIcon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'sub Heading Icon'
          }
        },
        {
          key: 'subheadingColor',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Sub Heading Color',
            options: [
              {
                label: 'Blue',
                value: 'text-primary'
              },
              {
                label: 'Gray',
                value: 'text-secondary'
              },
              {
                label: 'Green',
                value: 'text-success'
              },
              {
                label: 'Yellow',
                value: 'text-warning'
              },
              {
                label: 'Red',
                value: 'text-danger'
              },
              {
                label: 'Black',
                value: 'text-dark'
              },
              {
                label: 'White',
                value: 'text-white'
              },
              {
                label: 'Light White',
                value: 'text-light'
              },
              {
                label: 'Light Blue',
                value: 'text-info'
              },
            ]
          },
        },


        {
          className: "w-1/4 px-1",
          key: 'link',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Link'
          }
        },
        {
          key: 'api',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Api',
            options: [
              {
                label: 'Api',
                value: 'sharedMessage'
              },
            ]
          },
        },

        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-3",
        //   templateOptions: {
        //     label: 'Repeat'
        //   },
        // },
        {
          template: '<div class="bold-label mt-3">options</div>',
        },
        {
          key: 'options',
          type: 'repeatSection',
          templateOptions: {
            style: "margin-top:5%",
            canAdd: true,
            canRemove: true
          },
          fieldArray: {
            className: 'ml-3 me-2',
            fieldGroupClassName: "flex flex-wrap",
            fieldGroup: [
              {
                className: "w-1/3",
                key: 'message',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Message'
                }
              },
              {
                className: "w-1/3",
                key: 'dateAndTime',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  type: "datetime-local",
                  label: 'dateAndTime'
                }
              },
              {
                className: "w-1/3",
                key: 'icon',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'First Icon'
                }
              },
              {
                className: "w-1/3",
                key: 'icon1',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Second Icon'
                }
              },
            ]
          },
        },

      ]
    },
  ]
  alertFeilds: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          key: 'alertColor',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Alert Color',
            options: [
              {
                label: 'White',
                value: 'bg-white-600'
              },
              {
                label: 'Blue',
                value: 'bg-blue-600'
              },
              {
                label: 'Grey',
                value: 'bg-gray-600'
              },
              {
                label: 'Red',
                value: 'bg-red-600'
              },
              {
                label: 'Green',
                value: 'bg-green-600'
              },
              {
                label: 'Light Blue',
                value: 'bg-blue-200'
              },
              {
                label: 'Yellow',
                value: 'bg-yellow-600'
              },
              {
                label: 'Purple',
                value: 'bg-purple-600'
              },
              {
                label: 'Black',
                value: 'bg-black-600'
              },

            ]
          },

        },
        // {
        //   key: 'icon',
        //   type: 'input',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     label: 'Alert Icon',
        //   },
        // },

        {
          key: 'alertType',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Alert Type',
            options: [
              {
                label: 'Default',
                value: ''
              },
              {
                label: 'success',
                value: 'success'
              },
              {
                label: 'info',
                value: 'info'
              },
              {
                label: 'warning',
                value: 'warning'
              },
              {
                label: 'error',
                value: 'error'
              }
            ]
          },
        },


        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "col mt-5",
        //   templateOptions: {
        //     label: 'Repeat'
        //   },
        // },

        {
          className: "w-1/4 px-1",
          key: 'description',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Description',

          }
        },
        {
          className: "w-1/4 px-1",
          key: 'action',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Action',

          }
        },
        {
          className: "w-1/4 px-1",
          key: 'closeText',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'CloseText',

          }
        },
        {
          className: "w-1/4 px-1",
          key: 'iconType',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'IconType',

          }
        },
        {
          key: 'banner',
          type: 'checkbox',
          className: "w-1/6 px-1",
          templateOptions: {
            label: 'Banner',
          },
          defaultValue: false
        },
        {
          key: 'closeable',
          type: 'checkbox',
          className: "w-1/6 px-1",
          templateOptions: {
            label: 'Closeable',
          },
          defaultValue: false
        },
        {
          key: 'showIcon',
          type: 'checkbox',
          className: "w-1/6 px-1",
          templateOptions: {
            label: 'ShowIcon',
          },
          defaultValue: false
        },
        {
          className: "w-full mt-2",
          key: 'text',
          type: 'textarea',
          // wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Alert Text',
            rows: 2
          }
        },
      ]
    },
  ]
  simpleCardWithHeaderBodyFooterFeilds: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          key: 'textAlign',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Text Align',
            options: [
              {
                label: 'Left',
                value: 'text-left'
              },
              {
                label: 'Center',
                value: 'text-center'
              },
              {
                label: 'Right',
                value: 'text-right'
              },
            ]
          },
        },
        {
          className: "w-1/4 px-1",
          key: 'link',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'link',
            options: [
              {
                label: 'Select Api',
                value: ''
              },
              {
                label: 'IT',
                value: 'it'
              },
              {
                label: 'Textile',
                value: 'textile'
              },
            ]
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'nztype',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Type',
            options: [

              {
                label: 'Default',
                value: 'default'
              },
              {
                label: 'Inner',
                value: 'inner'
              },
            ]
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'size',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Size',
            options: [

              {
                label: 'Default',
                value: 'default'
              },
              {
                label: 'Small',
                value: 'small'
              },
            ]
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'imageAlt',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'image Alt',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'imageSrc',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Image Src',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'height',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Height',
          }
        },

        {
          className: "w-1/4 px-1",
          key: 'extra',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Extra',
          }
        },
        {
          key: 'borderless',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'Borderless'
          },
        },


        {
          key: 'hover',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'Hover'
          },
        },

        {
          key: 'loading',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'Loading'
          },
        },
        {
          className: "w-full",
          key: 'headerText',
          type: 'textarea',
          // wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Header Text',
            rows: 3,
          }
        },
        {
          className: "w-full",
          key: 'bodyText',
          type: 'textarea',
          // wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Body Text',
            rows: 3,
          }
        },
        {
          className: "w-full",
          key: 'footerText',
          type: 'textarea',
          // wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Footer Text',
            rows: 3,
          }
        },

      ]
    },
  ]
  timelineFeilds: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          className: "w-1/4 px-1",
          key: 'mainIcon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'MainIcon',
          }
        },

        {
          key: 'mode',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Position',
            options: [
              {
                label: 'Right',
                value: 'right'
              },
              {
                label: 'Left',
                value: 'left'
              },
              {
                label: 'Alternate',
                value: 'alternate'
              },
              {
                label: 'Custom',
                value: 'custom'
              },
            ]
          },
        },
        {
          key: 'reverse',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-3",
          templateOptions: {
            label: 'Reverse'
          },
        },


        {
          key: 'options',
          type: 'repeatSection',
          templateOptions: {
            style: "margin-top: 6%;",
            canAdd: true,
            canRemove: true
          },
          fieldArray: {
            fieldGroup: [
              {
                className: "w-1/4 px-1",
                key: 'title',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Title',
                }
              },
              {
                className: "w-1/4 px-1",
                key: 'dotIcon',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'DotIcon',
                }
              },

              {
                key: 'color',
                type: 'select',
                className: "w-1/4 px-1",
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Color',
                  options: [
                    {
                      label: 'Blue',
                      value: 'blue'
                    },
                    {
                      label: 'Green',
                      value: 'green'
                    },
                    {
                      label: 'Red',
                      value: 'red'
                    },
                    {
                      label: 'Gray',
                      value: 'grey'
                    },
                  ]
                },
              }
            ]
          }
        },
      ]
    },
  ]
  videosFeilds: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          key: 'title',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Video Title',
          },
        },
        // {
        //   key: 'videoRatio',
        //   type: 'input',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     label: 'Video Ratio',
        //   },
        // },
        {
          key: 'videoSrc',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Video Source',
          },
        },




        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-5",
        //   templateOptions: {
        //     label: 'Repeat'
        //   },
        // },
      ]
    },
  ]
  audioFeilds: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        // {
        //   key: 'title',
        //   type: 'input',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     label: 'Audio Title',
        //   },
        // },
        {
          key: 'audioSrc',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Audio Source',
            options: [
              {
                label: 'Audio 1',
                value: 'https://pagalfree.com/musics/128-Rasiya%20-%20Brahmastra%20128%20Kbps.mp3'
              },
              {
                label: 'Audio 2',
                value: 'https://pagalfree.com/musics/128-Morey%20Saiyaan%20Ji%20-%20Maninder%20Buttar%20128%20Kbps.mp3'
              },
              {
                label: 'Audio 3',
                value: 'https://pagalfree.com/musics/128-Roohedaariyaan%20-%20B%20Praak%20128%20Kbps.mp3'
              },

              {
                label: 'Audio 4',
                value: 'https://pagalfree.com/musics/128-Dil%20De%20Diya%20Hai%20-%20Thank%20God%20128%20Kbps.mp3'
              },
              {
                label: 'Audio 5',
                value: 'https://pagalfree.com/musics/128-Tu%20Saamne%20Aaye%20-%20Jubin%20Nautiyal%20128%20Kbps.mp3'
              },
              {
                label: 'Audio 6',
                value: 'https://pagalfree.com/musics/128-Drishyam%202%20Title%20Track%20-%20Drishyam%202%20128%20Kbps.mp3'
              },
              {
                label: 'Audio 7',
                value: 'https://pagalfree.com/musics/128-Ki%20Kariye%20-%20Code%20Name%20Tiranga%20128%20Kbps.mp3'
              }
            ]
          },
        },


        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-3",
        //   templateOptions: {
        //     label: 'Repeat'
        //   },
        // },
      ]
    },
  ]
  carouselCrossfadeFeilds: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          key: 'effect',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Effect',
            options: [
              {
                label: 'Simple',
                value: 'scrollx'
              },
              {
                label: 'Flip',
                value: 'flip'
              },

            ]
          }
        },
        {
          key: 'dotPosition',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Dot Position',
            options: [
              {
                label: 'bottom',
                value: 'bottom'
              },
              {
                label: 'top',
                value: 'top'
              },
              {
                label: 'left',
                value: 'left'
              },
              {
                label: 'right',
                value: 'right'
              },
            ]
          }
        },
        {
          key: 'link',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          defaultValue: "carousel-fade",
          templateOptions: {
            label: 'Api Ref',
            options: [
              {
                label: '--Select--',
                value: ''
              },
              {
                label: 'Carousel 1',
                value: 'carousel1'
              },
              {
                label: 'Carousel 2',
                value: 'carousel2'
              },
            ]
          }
        },
        {
          key: 'autolPlaySpeed',
          type: 'input',
          className: "w-1/6 px-1 mt-3",
          templateOptions: {
            type: 'number',
            label: 'Auto Play Speed'
          },
        },
        {
          key: 'autoPlay',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-3",
          templateOptions: {
            label: 'Auto Play'
          },
        },
        {
          key: 'showDots',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-3",
          templateOptions: {
            label: 'Show Dots'
          },
        },
        {
          key: 'enableSwipe',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-3",
          templateOptions: {
            label: 'Enable Swipe'
          },
        },
        {
          template: '<div class="w-full bold-label mt-3">options</div>',
        },
        {
          key: 'options',
          type: 'repeatSection',
          className: 'w-full',
          templateOptions: {
            style: "margin-top: 4%;",
            canAdd: true,
            canRemove: true
          },
          fieldArray: {

            fieldGroup: [
              {
                className: "ml-2",
                key: 'img',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Image Source'
                }
              }
            ]
          }
        },
      ]
    },
  ]
  kanbanFeilds: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [


        {
          key: 'nodes',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Nodes',
          },
        },


        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-3",
        //   templateOptions: {
        //     label: 'Repeat'
        //   },
        // },
      ]
    },
  ]
  multiFileUploadFeilds: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          key: 'multiple',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-3",
          templateOptions: {
            label: 'Multiple File'
          },
        },
        {
          className: "w-1/6 px-1 mt-3",
          key: 'disabled',
          type: 'checkbox',
          templateOptions: {
            label: 'Disable',
          },
          defaultValue: false
        },
      ]
    },
  ]
  textEditorFeilds: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
      ]
    },
  ]
  tuiCalendarFeilds: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          key: 'viewType',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Type',
            options: [
              {
                label: 'Month',
                value: 'month'
              },
              {
                label: 'Week',
                value: 'week'
              },
              {
                label: 'Day',
                value: 'day'
              },

            ]
          },
        },


        {
          key: 'statusApi',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          defaultValue: "w-full",
          templateOptions: {
            label: 'Api',
            options: [
              {
                label: 'calenderStatusApi',
                value: 'calenderStatusApi'

              },
            ]
          },
        },


        {
          className: "col mt-5",
          key: 'disabled',
          type: 'checkbox',
          templateOptions: {
            label: 'Disable',
          },
          defaultValue: false
        },
        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "col mt-5",
        //   templateOptions: {
        //     label: 'Repeat'
        //   },
        // },
        {
          template: '<div class="bold-label mt-3">options</div>',
        },
        {
          key: 'options',
          type: 'repeatSection',
          templateOptions: {
            style: "margin-top: 5%;",
            canAdd: true,
            canRemove: true
          },
          fieldArray: {
            className: 'ml-3 me-2',
            fieldGroup: [

              {
                className: "ml-2",
                key: 'name',
                type: 'input',
                templateOptions: {
                  label: 'Name'
                }
              },
              {
                className: "ml-2",
                key: 'bgColor',
                type: 'input',
                templateOptions: {
                  label: 'Backgroup Color'
                }
              },
            ]
          }
        },
      ]
    },
  ];
  kanbanTaskFeilds: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          key: 'kanbanTaskApi',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          defaultValue: "w-full",
          templateOptions: {
            label: 'Api',
            options: [
              {
                label: 'kanbanTaskApi',
                value: 'kanbanboarddata'

              },
            ]
          },
        },


        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-3",
        //   templateOptions: {
        //     label: 'Repeat'
        //   },
        // },
        {
          template: '<div class="bold-label mt-3">options</div>',
        },
        {
          key: 'options',
          type: 'repeatSection',
          templateOptions: {
            style: "margin-top: 4%;",
            canAdd: true,
            canRemove: true
          },
          fieldArray: {
            // className: 'ml-3 me-2',
            fieldGroup: [

              {
                className: "col",
                key: 'title',
                type: 'input',
                // wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'title'
                }
              },
              {
                className: "col",
                key: 'date',
                type: 'input',
                // wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'date'
                }
              },
              {
                className: "col",
                key: 'content',
                type: 'input',
                // wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'content'
                }
              },
              {
                className: "col",
                key: 'users',
                type: 'input',
                // wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'users'
                }
              },
              {
                className: "col",
                key: 'status',
                type: 'input',
                // wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'status'
                }
              },
              {
                key: 'variant',
                type: 'select',
                className: "col",
                // wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'variant',
                  options: [
                    {
                      label: 'Blue',
                      value: 'bg-primary'
                    },
                    {
                      label: 'Green',
                      value: 'bg-success'
                    },
                    {
                      label: 'Light Blue',
                      value: 'bg-info'
                    },
                    {
                      label: 'Yellow',
                      value: 'bg-warning'
                    },
                    {
                      label: 'Red',
                      value: 'bg-danger'
                    },
                    {
                      label: 'Gray',
                      value: 'bg-secondary'
                    },
                    {
                      label: 'White',
                      value: 'bg-white'
                    },
                    {
                      label: 'Muted',
                      value: 'bg-muted'
                    },
                    {
                      label: 'Dark',
                      value: 'bg-dark'
                    },
                  ]
                },
              },
            ]
          }
        },
      ]
    },
  ]
  menuBuilderDropdownFeilds: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'nodes',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'Nodes',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'icon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Icon',
          }
        },

      ]
    },
  ]
  menuBuilderPagesFeilds: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'link',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Link',
          }
        },
      ]
    },
  ]
  menuBuilderButtonFeilds: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'link',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Link',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'icon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'icon',
          }
        },
      ]
    },
  ]
  Feilds: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          key: 'title',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Audio Title',
          },
        },
        {
          key: 'audioSrc',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Audio Source',
          },
        },
      ]
    },
  ]
  breakTagFeilds: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
      ]
    },
  ]
  skeletonFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'size',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Select Size',
            options: [
              {
                label: 'Default',
                value: 'default'
              },
              {
                label: 'Large',
                value: 'large'
              },
              {
                label: 'Small',
                value: 'small'
              }
            ]
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'buttonShape',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Select Button Shape',
            options: [
              {
                label: 'Default',
                value: 'default'
              },
              {
                label: 'Circle',
                value: 'circle'
              },
              {
                label: 'Round',
                value: 'round'
              }
            ]
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'avatarShape',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Select Avatar Shape',
            options: [
              {
                label: 'Default',
                value: 'default'
              },
              {
                label: 'Circle',
                value: 'circle'
              },
              {
                label: 'Round',
                value: 'round'
              }
            ]
          }
        },
        {
          template: '<div class="mt-3"></div>'
        },
        {
          className: "w-1/6 px-1 mt-2",
          key: 'isActive',
          type: 'checkbox',
          templateOptions: {
            label: 'isActive',
          },
          defaultValue: false
        }
      ]
    },
  ]
  drawerFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'color',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Button Color',
            options: [
              {
                label: 'Blue',
                value: 'primary'
              },
              {
                label: 'Red',
                value: 'danger'
              },
              {
                label: 'Light Blue',
                value: 'info'
              },
              {
                label: 'Light Gray',
                value: 'default'
              },
              {
                label: 'yellow',
                value: 'warning'
              },
              {
                label: 'gray',
                value: 'secondary'
              }
            ]
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'title',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Title',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'btnText',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Button Text',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'icon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Close Icon',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'extra',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'extra ID Refrance',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'footerText',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Footer Text',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'placement',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Select Placement',
            options: [
              {
                label: 'Right',
                value: 'right'
              },
              {
                label: 'Left',
                value: 'left'
              },
              {
                label: 'Top',
                value: 'top'
              },
              {
                label: 'Bottom',
                value: 'bottom'
              }
            ]
          }
        },
        // {
        //   className: "w-1/4 px-1",
        //   key: 'maskStyle',
        //   type: 'input',
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     label: 'Mask Style',
        //   }
        // },
        // {
        //   className: "w-1/4 px-1",
        //   key: 'bodyStyle',
        //   type: 'input',
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     label: 'Body Style',
        //   }
        // },
        {
          className: "w-1/4 px-1",
          key: 'size',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Select Size',
            options: [
              {
                label: 'Default',
                value: 'default'
              },
              {
                label: 'Large',
                value: 'large'
              }
            ]
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'width',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Width',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'height',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Height',
            tooltip: "Height of the Drawer dialog, only when placement is 'top' or 'bottom', having a higher priority than nzSize"
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'offsetX',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Offset X',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'offsetY',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Offset Y',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'wrapClassName',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'wrap ClassName',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'zIndex',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Z Index',
          }
        },
        {
          template: '<div class="mt-3"></div>'
        },
        {
          className: "w-1/6 px-1 mt-2",
          key: 'isClosable',
          type: 'checkbox',
          templateOptions: {
            label: 'isClosable',
          },
          defaultValue: false
        },
        // {
        //   className: "w-1/6 px-1 mt-2",
        //   key: 'isMask',
        //   type: 'checkbox',
        //   templateOptions: {
        //     label: 'isMask',
        //   },
        //   defaultValue: false
        // },
        // {
        //   className: "w-1/6 px-1 mt-2",
        //   key: 'isMaskClosable',
        //   type: 'checkbox',
        //   templateOptions: {
        //     label: 'isMaskClosable',
        //   },
        //   defaultValue: false
        // },
        // {
        //   className: "w-1/6 px-1 mt-2",
        //   key: 'isCloseOnNavigation',
        //   type: 'checkbox',
        //   templateOptions: {
        //     label: 'isCloseOnNavigation',
        //   },
        //   defaultValue: false
        // },
        {
          className: "w-1/6 px-1 mt-2",
          key: 'isKeyboard',
          type: 'checkbox',
          templateOptions: {
            label: 'isKeyboard',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-2",
          key: 'isVisible',
          type: 'checkbox',
          templateOptions: {
            label: 'isVisible',
          },
          defaultValue: false
        }
      ]
    },
  ]
  emptyFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'icon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Image link'
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'content',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Content Refrance ID'
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'text',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Description'
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'link',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Description Link'
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'btnText',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Button Text'
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'color',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Button Color',
            options: [
              {
                label: 'White',
                value: 'bg-white-600'
              },
              {
                label: 'Blue',
                value: 'bg-blue-600'
              },
              {
                label: 'Grey',
                value: 'bg-gray-600'
              },
              {
                label: 'Red',
                value: 'bg-red-600'
              },
              {
                label: 'Green',
                value: 'bg-green-600'
              },
              {
                label: 'Light Blue',
                value: 'bg-blue-200'
              },
              {
                label: 'Yellow',
                value: 'bg-yellow-600'
              },
              {
                label: 'Purple',
                value: 'bg-purple-600'
              },
              {
                label: 'Black',
                value: 'bg-black-600'
              },

            ]
          }
        }
      ]
    },
  ]
  listFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'headerText',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Header Text',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'footerText',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Footer Text',
          }
        },
        {
          key: 'formatter',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'column',
            options: [
              {
                label: 'Vertical',
                value: 'vertical'
              },
              {
                label: 'Horizontal',
                value: 'horizontal'
              }
            ]
          }
        },
        {
          key: 'size',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'column',
            options: [
              {
                label: 'Default',
                value: 'default'
              },
              {
                label: 'Small',
                value: 'small'
              },
              {
                label: 'Large',
                value: 'large'
              }
            ]
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'loadText',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Load More Text'
          }
        },
        {
          template: '<div class="mt-3"></div>'
        },
        {
          className: "w-1/6 px-1 mt-2",
          key: 'isBordered',
          type: 'checkbox',
          templateOptions: {
            label: 'isBordered',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-2",
          key: 'isSplit',
          type: 'checkbox',
          templateOptions: {
            label: 'isSplit',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-2",
          key: 'isEdit',
          type: 'checkbox',
          templateOptions: {
            label: 'isEdit',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-2",
          key: 'isUpdate',
          type: 'checkbox',
          templateOptions: {
            label: 'isUpdate',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-2",
          key: 'isDelete',
          type: 'checkbox',
          templateOptions: {
            label: 'isDelete',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-2",
          key: 'isLoad',
          type: 'checkbox',
          templateOptions: {
            label: 'isLoad',
          },
          defaultValue: false
        },
        {
          template: '<div class="mt-3">Options List</div>'
        },
        {
          key: 'options',
          type: 'repeatSection',
          // wrappers:["form-field-horizontal"],
          templateOptions: {
            style: "margin-top: 6%;",
            canAdd: true,
            canRemove: true
          },
          fieldArray: {
            // className: 'ml-3 me-2',
            fieldGroupClassName: "flex flex-wrap",
            fieldGroup: [
              {
                key: 'avater',
                type: 'input',
                className: "w-1/4 px-1",
                // wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Profile Image'
                }
              },
              {
                key: 'name',
                type: 'input',
                className: "w-1/4 px-1",
                // wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'name'
                }
              },
              {
                key: 'description',
                type: 'input',
                className: "w-1/4 px-1",
                // wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'description'
                }
              },
              {
                key: 'email',
                type: 'input',
                className: "w-1/4 px-1",
                // wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'email'
                }
              },
              {
                key: 'lastNameHref',
                type: 'input',
                className: "w-1/4 px-1",
                // wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'last Name Href'
                }
              },
              {
                key: 'content',
                type: 'input',
                className: "w-1/4 px-1",
                // wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'content'
                }
              },
              {
                key: 'isLoading',
                type: 'checkbox',
                className: "w-1/6 px-1 mt-2",
                // wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'isLoading'
                }
              }
            ]
          }
        },
      ]
    },
  ]
  descriptionFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'nzExtra',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'nzExtra',
          }
        },
        {
          key: 'formatter',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'column',
            options: [
              {
                label: 'Vertical',
                value: 'vertical'
              },
              {
                label: 'Horizontal',
                value: 'horizontal'
              }
            ]
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'size',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Select Size',
            options: [
              {
                label: 'Default',
                value: 'default'
              },
              {
                label: 'Large',
                value: 'large'
              },
              {
                label: 'Small',
                value: 'small'
              }
            ]
          }
        },
        {
          template: '<div class="mt-3"></div>'
        },
        {
          className: "w-1/6 px-1 mt-2",
          key: 'isBordered',
          type: 'checkbox',
          templateOptions: {
            label: 'isBordered',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-2",
          key: 'isColon',
          type: 'checkbox',
          templateOptions: {
            label: 'isColon',
          },
          defaultValue: false
        }
      ]
    },
  ]
  badgeFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'nzCount',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'Count',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'nzText',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Text',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'nzColor',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'color',
            label: 'Color',
          }
        },
        {
          key: 'nzStatus',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Status',
            options: [
              {
                label: 'Success',
                value: 'success'
              },
              {
                label: 'Error',
                value: 'error'
              },
              {
                label: 'Default',
                value: 'default'
              },
              {
                label: 'Processing',
                value: 'processing'
              },
              {
                label: 'Warning',
                value: 'warning'
              },
            ]
          }
        },
        {
          key: 'size',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Size',
            options: [
              {
                label: 'Default',
                value: 'default '
              },
              {
                label: 'Small',
                value: 'small'
              },

            ]
          }
        },
        // {
        //   className: "w-1/4 px-1",
        //   key: 'title',
        //   type: 'input',
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     label: 'Title',
        //   }
        // },
        {
          className: "w-1/4 px-1",
          key: 'overflowCount',
          type: 'number',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'OverflowCount',
          }
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'standAlone',
          type: 'checkbox',
          // wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'StandAlone',
          }
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'dot',
          type: 'checkbox',
          // wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Dot',
          }
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'showDot',
          type: 'checkbox',
          // wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'ShowDot',
          }
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'showZero',
          type: 'checkbox',
          // wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'ShowZero',
          }
        },
      ]
    },
  ]
  descriptionChildFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'content',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'content',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'nzStatus',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'nzStatus',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'nzSpan',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'nzSpan',
            type: "number"
          }
        },
        {
          template: '<div class="mt-3"></div>'
        },
        {
          className: "w-1/6 px-1 mt-2",
          key: 'isBadeg',
          type: 'checkbox',
          templateOptions: {
            label: 'isBadeg',
          },
          defaultValue: false
        }
      ]
    },
  ]
  affixFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          key: 'affixType',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Affix Type',
            className: "w-1/4 px-1",
            options: [
              {
                label: 'Affix Top',
                value: 'affix-top'
              },
              {
                label: 'Affix Bottom',
                value: 'affix-bottom'
              },
            ]
          },
        },
        {
          className: "w-1/4 px-1",
          key: 'margin',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'margin'
          }
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'target',
          type: 'checkbox',
          templateOptions: {
            label: 'Target',
          },
        },
      ]
    },
  ]
  avatarFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'icon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Icon',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'text',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Text',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'src',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Image src',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'alt',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Imag alt',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'size',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Avatar Size',
            options: [
              {
                label: 'Default',
                value: 'default'
              },
              {
                label: 'Large',
                value: 'large'
              },
              {
                label: 'Small',
                value: 'small'
              },
              // {
              //   label: 'Number',
              //   value: 'number'
              // }
            ]
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'shape',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Avatar Shape',
            options: [
              {
                label: 'Circle',
                value: 'circle'
              },
              {
                label: 'Square',
                value: 'square'
              }
            ]
          }
        },
        {
          key: 'bgColor',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: "color",
            label: 'Bg-color',
          },
        },
        {
          key: 'color',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: "color",
            label: 'Color',
          },
        },
        {
          key: 'gap',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: "number",
            label: 'Gap',
          },
        },
      ]
    },
  ];
  backtopFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'visibleafter',
          type: 'number',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Visible After',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'target',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Target',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'duration',
          type: 'number',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Duration',
          }
        },
      ]
    }
  ]
  commentFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'avatar',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Avatar',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'author',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'author',
          }
        },
      ]
    },
  ];
  popOverFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'btnLabel',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Button Label',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'content',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Popover Content',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'mouseEnterDelay',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'Mouse enter delay',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'mouseLeaveDelay',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'Mouse leave delay',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'trigger',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Trigger type',
            options: [
              {
                label: 'Click',
                value: 'click'
              },
              {
                label: 'Focus',
                value: 'focus'
              },
              {
                label: 'Hover',
                value: 'hover'
              },
              {
                label: 'Null',
                value: 'null'
              },
            ]
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'placement',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Placement',
            options: [
              {
                label: 'Top',
                value: 'top'
              },
              {
                label: 'Left',
                value: 'left'
              },
              {
                label: 'Right',
                value: 'right'
              },
              {
                label: 'Bottom',
                value: 'bottom'
              },
              {
                label: 'Top left',
                value: 'topLeft'
              },
              {
                label: 'Top right',
                value: 'topRight'
              },
              {
                label: 'Bottom left',
                value: 'bottomLeft'
              },
              {
                label: 'Bottom right',
                value: 'bottomRight'
              },
              {
                label: 'Left top',
                value: 'leftTop'
              },
              {
                label: 'Left bottom',
                value: 'leftBottom'
              },
              {
                label: 'Right top',
                value: 'rightTop'
              },
              {
                label: 'Right bottom',
                value: 'rightBottom'
              },
            ]
          }
        },
        {
          className: "col mt-5",
          key: 'arrowPointAtCenter',
          type: 'checkbox',
          templateOptions: {
            label: 'Arrow Point At Center',
          },
          defaultValue: false
        },
        {
          className: "col mt-5",
          key: 'visible',
          type: 'checkbox',
          templateOptions: {
            label: 'Visible',
          },
          defaultValue: false
        },
      ]
    },
  ];
  spinFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'size',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Size',
            options: [
              {
                label: 'Small',
                value: 'small'
              },
              {
                label: 'Large',
                value: 'large'
              },
              {
                label: 'default',
                value: 'Default'
              }
            ]
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'delayTime',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'Delay time',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'loaderText',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Loader text',
          }
        },
        {
          className: "col mt-5",
          key: 'spinning',
          type: 'checkbox',
          templateOptions: {
            label: 'Spinning',
          },
          defaultValue: false
        },
        {
          className: "col mt-5",
          key: 'simple',
          type: 'checkbox',
          templateOptions: {
            label: 'Simple',
          },
          defaultValue: false
        },
      ]
    },
  ];
  resultFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'status',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Status',
            options: [
              {
                label: 'success',
                value: 'success'
              },
              {
                label: 'info',
                value: 'info'
              },
              {
                label: 'warning',
                value: 'warning'
              },
              {
                label: '403',
                value: '403'
              },
              {
                label: '404',
                value: '404'
              },
            ]
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'resultTitle',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Result Title',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'subTitle',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Sub Title',
          }
        },


        {
          className: "w-1/4 px-1",
          key: 'icon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Icon',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'extra',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Extra',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'btnLabel',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Button Label',
          }
        },
      ]
    },
  ]
  inputGroupGridFeilds: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
      ]
    },
  ]
  toastrFeilds: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          className: "w-1/4 px-1",
          key: 'timeOut',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Time Out',
            type: 'number',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'message',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Message',
          }
        },
        {
          key: 'toastrType',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Toastr Type',
            options: [
              {
                label: 'Simple',
                value: 'simple'
              },
              {
                label: 'Success',
                value: 'success'
              },
              {
                label: 'Error',
                value: 'error'
              },
              {
                label: 'Info',
                value: 'info'
              },
              {
                label: 'Warning',
                value: 'warning'
              },
            ]
          },
        },
        {
          key: 'positionClass',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Position',
            options: [
              {
                label: 'Top right',
                value: 'toast-top-right'
              },
              {
                label: 'Top left',
                value: 'toast-top-left'
              },
              {
                label: 'Top center',
                value: 'toast-top-center'
              },
              {
                label: 'Top full width',
                value: 'toast-top-full-width'
              },
              {
                label: 'Bottom right',
                value: 'toast-bottom-right'
              },
              {
                label: 'Bottom left',
                value: 'toast-bottom-left'
              },
              {
                label: 'Bottom Center',
                value: 'toast-bottom-center'
              },
              {
                label: 'Bottom full width',
                value: 'toast-bottom-full-width'
              }
            ]
          },
        },

        {
          className: "col mt-5",
          key: 'progressBar',
          type: 'checkbox',
          templateOptions: {
            label: 'progressBar',
          },
        },
        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "col mt-5",
        //   templateOptions: {
        //     label: 'Repeat'
        //   },
        // },
      ]
    },
  ]

  invoiceFeilds: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          className: "w-1/4 px-1",
          key: 'invoiceNumberLabel',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'invoice number label',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'datelabel',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Date Label',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'paymentTermsLabel',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Payment Terms Label',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'billToLabel',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'BillTo Label',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'dueDateLabel',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Due Date Label',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'poNumber',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'PO Number',
          }
        },
        {
          key: 'shipToLabel',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Ship To Label',
          }
        },
        {
          key: 'notesLabel',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Notes Label',
          }
        },
        {
          key: 'subtotalLabel',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Subtotal Label',
          }
        },
        {
          key: 'dicountLabel',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Dicount Label',
          }
        },
        {
          key: 'shippingLabel',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Shipping Label',
          }
        },
        {
          key: 'taxLabel',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Tax Label',
          }
        },
        {
          key: 'termsLabel',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Terms Label',
          }
        },
        {
          key: 'totalLabel',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Total Label',
          }
        },
        {
          key: 'amountpaidLabel',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Amount Paid Label',
          }
        },
        {
          key: 'balanceDueLabel',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Balance Due Label',
          }
        },
      ]
    },
  ]
  imageUploadFeilds: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          className: "w-1/4 px-1",
          key: 'alt',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Alt',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'source',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Image Source',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'imagHieght',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'Imag Hieght',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'imageWidth',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'Image Width',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'zoom',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'zoom',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'rotate',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'rotate',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'zIndex',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'zIndex',
          }
        },
        {
          key: 'imageClass',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Image Class',
            options: [
              {
                label: 'rounded-circle',
                value: 'rounded-full'
              },
              {
                label: 'rounded',
                value: 'rounded-lg'
              },
            ]
          },
        },
        {
          key: 'image',
          type: 'image-upload',
          className: "col-md-4 col-sm-6 col-xs-12 ",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Image Upload',
          }
        },
        {
          key: 'keyboardKey',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'keyboard Key'
          },
        },
        {
          key: 'imagePreview',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'image Preview button'
          },
        },
      ]
    },
  ]
  rangeSliderFeilds: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          className: "w-1/4 px-1",
          key: 'min',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Min',
            type: 'number',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'max',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Max',
            type: 'number',
          }
        },
        // {
        //   key: 'sliderType',
        //   type: 'select',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     label: 'Toastr Type',
        //     options: [
        //       {
        //         label: 'Simple',
        //         value: 'simple'
        //       },
        //       {
        //         label: 'Custome Slider',
        //         value: 'customeSlider'
        //       },
        //     ]
        //   },
        // },

        {
          className: "w-1/6 px-1 mt-5",
          key: 'disabled',
          type: 'checkbox',
          templateOptions: {
            label: 'Disabled',
          },
        },


        {
          className: "w-1/3 mt-3",
          key: 'showValue',
          type: 'checkbox',
          templateOptions: {
            label: 'Show range value',
          },
        },
        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-3",
        //   templateOptions: {
        //     label: 'Repeat'
        //   },
        // },
      ]
    },
  ]
  menufield: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'icon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Icon',
          }
        },

        {
          className: "w-1/4 px-1",
          key: 'link',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Link',
          }
        },
        {
          key: 'isTitle',
          type: 'checkbox',
          className: "w-1/3 mt-2",
          templateOptions: {
            label: 'Is Title'
          },
          defaultValue: false
        },
      ]
    },
  ]

  gridFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          key: 'nzFooter',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Footer Text'
          }
        },
        {
          key: 'nzTitle',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Header Text'
          }
        },
        {
          key: 'nzPaginationPosition',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Pagination Position',
            options: [
              {
                label: 'Top',
                value: 'top'
              },
              {
                label: 'Bottom',
                value: 'bottom'
              },
              {
                label: 'Both',
                value: 'both'
              },
            ]
          },
        },
        {
          key: 'nzPaginationType',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Pagination Type',
            options: [
              { value: 'default', label: 'Default' },
              { value: 'small', label: 'Small' }
            ]
          },
        },
        {
          key: 'nzSize',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Size',
            options: [
              { value: 'default', label: 'Default' },
              { value: 'middle', label: 'Middle' },
              { value: 'small', label: 'Small' }
            ]
          },
        },
        {
          key: 'api',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Api',
            options: [
              { value: 'gridNewApi', label: 'Api' },

            ]
          },
        },
        {
          key: 'nzLoading',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'Loading',
          },
          defaultValue: false
        },
        {
          key: 'nzShowPagination',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'Show Pagination',
          },
          defaultValue: false
        },
        {
          key: 'nzBordered',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'Show Border',
          },
          defaultValue: false
        },
        {
          key: 'showColumnHeader',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'Column Header',
          },
        },
        {
          key: 'noResult',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'No Result',
          },
          defaultValue: false
        },
        {
          key: 'nzShowSizeChanger',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'PageSizeChanger',
          },
          defaultValue: false
        },
        {
          key: 'nzSimple',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'Simple Pagination',
          },
          defaultValue: false
        },
        {
          key: 'showCheckbox',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'Show checkbox',
          },
          defaultValue: false
        },
        {
          template: '<div class="bold-label mt-3">Columns</div>',
        },
        {
          key: 'options',
          type: 'repeatSection',
          className: "w-full px-1",
          templateOptions: {
            style: "margin-top: 6%;",
            canAdd: true,
            canRemove: true
          },
          fieldArray: {
            className: 'ml-3 me-2',
            fieldGroup: [
              {
                key: 'name',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Column Name'
                }
              },
              {
                key: 'sortOrder',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'Column Name'
                }
              },
              {
                key: 'sortDirections',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'sortDirections'
                }
              },
              {
                key: 'filterMultiple',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                templateOptions: {
                  label: 'filterMultiple'
                }
              }
              // {
              //   className: "ml-2",
              //   key: 'showColumn',
              //   type: 'checkbox',
              //   wrappers: ["formly-vertical-wrapper"],
              //   templateOptions: {
              //     label: 'Is Show'
              //   }
              // }
            ]
          }
        }
      ]
    }
  ]
  gridNameFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          key: 'pagination',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'Pagination'
          }
        },
        {
          key: 'link',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'API Data Link',
            options: [
              {
                label: 'Sample Data',
                value: 'newGridApi',
              },
              {
                label: 'Sample Data 2',
                value: 'GridDataSalary',
              },
              {
                label: 'Invoice Grid Data',
                value: 'invoiceGrid',
              }
            ]
          }
        },
        {
          key: 'deleteapi',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Delete API'
          }
        },

        // {
        //   key: 'delete',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-3",
        //   templateOptions: {
        //     label: 'Delete',
        //   },
        // },
        // {
        //   key: 'update',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-3",
        //   templateOptions: {
        //     label: 'Update',
        //   },
        // },
        // {
        //   key: 'create',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-3",
        //   templateOptions: {
        //     label: 'Create',
        //   },
        // },
        {
          key: 'sortable',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'Enable Sorting',
          },
        },
        {
          key: 'filter',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          templateOptions: {
            label: 'Enable Filter'
          },
        },

        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-3",
        //   templateOptions: {
        //     label: 'Repeat'
        //   },
        // },
        {
          template: '<div class="bold-label mt-3">options</div>',
        },

        {
          key: 'options',
          type: 'repeatSection',
          templateOptions: {
            style: "margin-top: 5%;",
            canAdd: true,
            canRemove: true
          },
          fieldArray: {
            // className: 'ml-3 me-2',
            fieldGroup: [

              {
                key: 'name',
                type: 'input',
                className: "w-1/3",
                templateOptions: {
                  label: 'key',

                },
              },
              {
                key: 'header',
                type: 'input',
                className: "w-1/3",
                templateOptions: {
                  label: 'header',
                }
              },
              {
                key: 'rule',
                type: 'input',
                className: "w-1/3",
                templateOptions: {
                  label: 'Rule',
                }
              },
              {
                key: 'showColumn',
                type: 'checkbox',
                className: "w-1/12 mt-4",
                templateOptions: {
                  label: 'Show'
                },
                defaultValue: false
              },
              {
                key: 'sumColumn',
                type: 'checkbox',
                className: "w-1/12 mt-4",
                templateOptions: {
                  label: 'Sum'
                },
                defaultValue: false
              },
            ]
          }
        },
      ]
    }
  ]
  gridAPIFields: FormlyFieldConfig[] = [
    {
      key: 'APIList',
      type: 'select',
      className: "w-1/4 px-1",
      templateOptions: {
        label: 'API',
        options: [
          {
            label: 'User Grid Data',
            value: 'gridViewDataJson',
          }
        ]
      },
    }
  ]
  inputValidationRuleFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          key: 'type',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'InputType',
            options: [
              {
                label: 'String',
                value: 'text'
              },
              {
                label: 'Integer',
                value: 'number'
              },
              {
                label: 'Pattern',
                value: 'pattern'
              },
              {
                label: 'Refrance',
                value: 'refrance'
              },
              {
                label: 'Email',
                value: 'email'
              }
            ]
          },
          defaultValue: 'text'
        },
        {
          template: '<div class="mt-3"></div>'
        },
        {
          key: 'emailTypeAllow',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            multiple: true,
            label: 'Email Type Allow',
            options: [
              {
                label: 'Com',
                value: 'com'
              },
              {
                label: 'Net',
                value: 'net'
              }
            ]
          },
          expressionProperties: {
            hide: "model.type!='email'",
          },
          defaultValue: 'text',
        },
        {
          className: "w-1/4 px-1",
          key: 'refrance',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Refrance'
          },
          expressionProperties: {
            hide: "model.type!='refrance'",
          },
        },
        {
          className: "w-1/4 px-1",
          key: 'minlength',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Min Length',
            type: 'number'
          },
          expressionProperties: {
            hide: "model.type!='text' && model.type!='number'",
          },
        },
        {
          className: "w-1/4 px-1",
          key: 'maxlength',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Max Length',
            type: 'number'
          },
          expressionProperties: {
            hide: "model.type!='text' && model.type!='number'",
          },
        },
        {
          className: "w-1/6 px-1 mt-2",
          key: 'required',
          type: 'checkbox',
          templateOptions: {
            label: 'required'
          },
          expressionProperties: {
            hide: "model.type!='text'",
          },
          defaultValue: false
        },
        {
          className: "w-1/4 px-1",
          key: 'pattern',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          defaultValue: "^[a-zA-Z0-9]{3,30}$",
          templateOptions: {
            label: 'Pattern',
          },
          expressionProperties: {
            hide: "model.type!='pattern'",
          }
        },
        // {
        //   key: 'emailTypeAllow',
        //   type: 'repeatSection',
        //   templateOptions: {
        //     canAdd: true,
        //     canRemove: true
        //   },
        //   fieldArray: {
        //     className: 'ml-3 me-2',
        //     fieldGroup: [
        //
        //       {
        //         className: "ml-2",
        //         key: 'value',
        //         type: 'input',
        //         wrappers: ["formly-vertical-wrapper"],
        //         templateOptions: {
        //           label: 'value'
        //         }
        //       }
        //     ]
        //   },
        //   expressionProperties: {
        //     hide: "model.type!='email'",
        //   }
        // },
        // {
        //   template: '<div class="mb-3"></div>'
        // },

      ]
    },
  ]
  commonFormlyConfigurationFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'key',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            config: {},
            label: 'Key',
            required: true,
            pattern: /^[a-z0-9_]+$/,
          }
        },
        {
          className: "w-1/4 px-2 d-none",
          key: 'id',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            config: {},
            label: 'ID',
            pattern: '^\\S*$',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'title',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            config: {},
            label: 'label'
          }
        },
        {
          className: "w-1/4 px-2",
          key: 'tooltip',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            config: {},
            label: 'Tooltip',
          }
        },
        {
          className: "w-1/4 px-2",
          key: 'className',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            config: {},
            label: 'column',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'titleIcon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            config: {},
            label: 'Label Icon',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'placeholder',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Placeholder',
          }
        },

        {
          key: 'defaultValue',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            config: {},
            label: 'Default Value'
          },
        },
        {
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          key: 'addonLeft',
          type: 'input',
          templateOptions: {
            config: {},
            label: 'Add On Left Text'
          }
        },
        {
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          key: 'addonRight',
          type: 'input',
          templateOptions: {
            config: {},
            label: 'Add On Right Text'
          }
        },
        {
          key: 'rows',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            config: {},
            label: 'Rows'
          }
        },
        {
          template: '<div class="flex flex-wrap"></div>'
        },
        {
          className: "mt-5 px-2",
          key: 'focus',
          type: 'checkbox',
          templateOptions: {
            label: 'Autofocus'
          },
          defaultValue: false
        },
        {
          className: "mt-5 px-2",
          key: 'required',
          type: 'checkbox',
          templateOptions: {
            label: 'required'
          },
          defaultValue: false
        },
        {
          className: "mt-5 px-2",
          key: 'readonly',
          type: 'checkbox',
          templateOptions: {
            label: 'Readonly'
          },
          defaultValue: false
        },
        {
          className: "mt-5 px-2",
          key: 'disabled',
          type: 'checkbox',
          templateOptions: {
            label: 'Disabled',
          },
          defaultValue: false
        },
        {
          className: "mt-5 px-2",
          key: 'hideExpression',
          type: 'checkbox',
          templateOptions: {
            label: 'Hide',
          },
          defaultValue: false
        },
      ]
    },
  ]
  commonOtherConfigurationFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'key',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Key',
            required: true,
            pattern: /^[a-z0-9_]+$/,
          }
        },
        {
          className: "w-1/4 px-2 d-none",
          key: 'id',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'ID',
            pattern: '^\\S*$',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'title',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'label'
          }
        },
        {
          className: "w-1/4 px-2",
          key: 'tooltip',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Tooltip',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'className',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'className',
          },
          defaultValue: 'w-1/4  px-1'
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'hideExpression',
          type: 'checkbox',
          templateOptions: {
            label: 'Hide',
          },
          defaultValue: false
        },
      ]
    },
  ]
  commonMenuBuilderConfigurationFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'key',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Key',
            required: true,
            pattern: /^[a-z0-9_]+$/,
          }
        },
        {
          className: "w-1/4 px-2 d-none",
          key: 'id',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'ID',
            pattern: '^\\S*$',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'title',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'label'
          }
        },
      ]
    },
  ]
  statisticFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'prefixIcon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Prefix',
          }
        },
        {
          className: "w-1/4 px-2",
          key: 'suffixIcon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Suffix',
          }
        },
        {
          key: 'options',
          type: 'repeatSection',
          className: "w-full",
          templateOptions: {
            style: "margin-top: 6%;",
            canAdd: true,
            canRemove: true
          },
          fieldArray: {
            fieldGroup: [
              {
                key: 'title',
                type: 'input',
                className: "w-1/4 px-1",
                templateOptions: {
                  label: 'Title'
                }
              },
              {
                key: 'value',
                type: 'input',
                className: "w-1/4 px-1",
                templateOptions: {
                  label: 'Value'
                }
              },
            ]
          }
        },
      ]
    },
  ];
  segmentedFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          className: "w-1/4 px-1",
          key: 'defaultSelectedIndex',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'Default Selected Index',
          }
        },
        {
          className: "w-1/4 px-2 d-none",
          key: 'size',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Size',
            options: [
              {
                label: 'Large ',
                value: 'large '
              },
              {
                label: 'Default',
                value: 'default'
              },
              {
                label: 'Small',
                value: 'small'
              },
            ]
          }
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'disabled',
          type: 'checkbox',
          templateOptions: {
            label: 'Disabled',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'block',
          type: 'checkbox',
          templateOptions: {
            label: 'block',
          },
          defaultValue: false
        },
        {
          key: 'options',
          type: 'repeatSection',
          templateOptions: {
            style: "margin-top: 6%;",
            canAdd: true,
            canRemove: true
          },
          fieldArray: {
            fieldGroup: [
              {
                key: 'label',
                type: 'input',
                className: "w-1/4 px-1",
                templateOptions: {
                  label: 'label'
                }
              },
            ]
          }
        },

      ]
    },
  ];
  mentionsFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-2 d-none",
          key: 'status',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Status',
            options: [
              {
                label: 'Default',
                value: 'default'
              },
              {
                label: 'Warning ',
                value: 'warning'
              },

              {
                label: 'Error',
                value: 'error'
              },
            ]
          }
        },
        {
          className: "w-1/4 px-2 d-none",
          key: 'position',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Position',
            options: [
              {
                label: 'Default',
                value: 'default'
              },
              {
                label: 'Top ',
                value: 'top'
              },

              {
                label: 'Bottom',
                value: 'bottom'
              },
            ]
          }
        },
        {
          className: "w-1/4 px-2 d-none",
          key: 'api',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Api',
            options: [
              {
                label: 'Api',
                value: 'mentionApi'
              },
            ]
          }
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'loading',
          type: 'checkbox',
          templateOptions: {
            label: 'Loading',
          },
          defaultValue: false
        },

        {
          className: "w-1/4 mt-5 px-2",
          key: 'disabled',
          type: 'checkbox',
          templateOptions: {
            label: 'Disabled',
          },
          defaultValue: false
        },
        {
          key: 'options',
          type: 'repeatSection',
          templateOptions: {
            style: "margin-top: 6%;",
            canAdd: true,
            canRemove: true
          },
          fieldArray: {
            fieldGroup: [
              {
                key: 'label',
                type: 'input',
                className: "w-1/4 px-1",
                templateOptions: {
                  label: 'label'
                }
              },
            ]
          }
        },

      ]
    },
  ];

  nzTagFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        // {
        //   className: "w-1/4 px-1",
        //   key: 'Color',
        //   type: 'input',
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     type: 'color',
        //     label: 'color',
        //   }
        // },
        {
          className: "w-1/4 px-2 d-none",
          key: 'mode',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Mode',
            options: [
              {
                label: 'closeable ',
                value: 'closeable '
              },
              {
                label: 'Default ',
                value: 'default '
              },
              {
                label: 'Checkable',
                value: 'checkable'
              },
            ]
          }
        },

      ]
    },
  ];
  messageFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'content',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Content',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'duration',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'Duration',
          }
        },
        {
          className: "w-1/4 px-2 d-none",
          key: 'messageType',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Message Type',
            options: [
              {
                label: 'success ',
                value: 'success'
              },
              {
                label: 'error ',
                value: 'error'
              },
              {
                label: 'info',
                value: 'info'
              },
              {
                label: 'warning',
                value: 'warning'
              },
              {
                label: 'loading',
                value: 'loading'
              },
            ]
          }
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'pauseOnHover',
          type: 'checkbox',
          templateOptions: {
            label: 'Pause OnHover',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'animate',
          type: 'checkbox',
          templateOptions: {
            label: 'Animate',
          },
          defaultValue: false
        },
      ]
    },
  ];
  notificationFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'content',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Content',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'icon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Icon',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'color',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'color',
            label: 'Color',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'duration',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'Duration',
          }
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'pauseOnHover',
          type: 'checkbox',
          templateOptions: {
            label: 'Pause OnHover',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'animate',
          type: 'checkbox',
          templateOptions: {
            label: 'Animate',
          },
          defaultValue: false
        },
      ]
    },
  ];
  progressBarFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'progressBarType',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Progress Bar Type',
            options: [
              {
                label: 'line ',
                value: 'line'
              },
              {
                label: 'circle ',
                value: 'circle'
              },
              {
                label: 'dashboard',
                value: 'dashboard'
              },
            ]
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'status',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Status',
            options: [
              {
                label: 'success ',
                value: 'success'
              },
              {
                label: 'exception ',
                value: 'exception'
              },
              {
                label: 'active',
                value: 'active'
              },
              {
                label: 'normal',
                value: 'normal'
              },
            ]
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'strokeLineCap',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Stroke Line Cap',
            options: [
              {
                label: 'round ',
                value: 'round'
              },
              {
                label: 'square ',
                value: 'square'
              },
            ]
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'percent',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'Percent',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'success',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'Success Percentage',
          }
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'showInfo',
          type: 'checkbox',
          templateOptions: {
            label: 'ShowInfo',
          },
          defaultValue: false
        },
      ]
    },
  ];
  rateFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [

        {
          className: "w-1/4 px-1",
          key: 'icon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Icon',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'showCount',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'Show number ',
          }
        },

        {
          className: "w-1/4 px-1 mt-5",
          key: 'allowHalf',
          type: 'checkbox',
          templateOptions: {
            label: 'Allow Half',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 px-1 mt-5",
          key: 'focus',
          type: 'checkbox',
          templateOptions: {
            label: 'Focus',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 px-1",
          key: 'clear',
          type: 'checkbox',
          templateOptions: {
            label: 'Click clear',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 px-1",
          key: 'disabled',
          type: 'checkbox',
          templateOptions: {
            label: 'Disabled',
          },
          defaultValue: false
        },
      ]
    },
  ];
  transferFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'firstBoxTitle',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'First box title',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'secondBoxTitle',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Second box title',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'leftButtonLabel',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Left button label',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'rightButtonLabel',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Right button label',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'searchPlaceHolder',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Search placeHolder',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'notFoundContentLabel',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Not found content label',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'status',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Status',
            options: [
              {
                label: 'error',
                value: 'error'
              },
              {
                label: 'warning',
                value: 'warning'
              },
            ]
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'api',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'api',
            options: [
              {
                label: 'api',
                value: 'transferApi'
              },

            ]
          }
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'disabled',
          type: 'checkbox',
          templateOptions: {
            label: 'Disabled',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'showSearch',
          type: 'checkbox',
          templateOptions: {
            label: 'ShowSearch',
          },
          defaultValue: false
        },
        {
          key: 'options',
          type: 'repeatSection',
          className: "w-full",
          templateOptions: {
            style: "margin-top: 6%;",
            canAdd: true,
            canRemove: true
          },
          fieldArray: {
            fieldGroup: [
              {
                key: 'key',
                type: 'input',
                className: "w-1/4 px-1",
                templateOptions: {
                  label: 'key'
                }
              },
              {
                key: 'title',
                type: 'input',
                className: "w-1/4 px-1",
                templateOptions: {
                  label: 'title'
                }
              },
              {
                key: 'direction',
                type: 'input',
                className: "w-1/4 px-1",
                templateOptions: {
                  label: 'direction'
                }
              },
            ]
          }
        },
      ]
    },
  ];
  modalFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'btnLabel',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Button Label',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'modalContent',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Modal Content',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'modalTitle',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Modal title',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'cancalButtontext',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Cancal button text',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'okBtnText',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Ok btn text',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'closeIcon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Close Icon',
          }
        },
        // {
        //   className: "w-1/4 px-1",
        //   key: 'zIndex',
        //   type: 'input',
        //   wrappers: ["formly-vertical-wrapper"],
        //   templateOptions: {
        //     type:'number',
        //     label: 'Z-Index',
        //   }
        // },
        {
          className: "w-1/4 px-1",
          key: 'width',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            type: 'number',
            label: 'Width',
          }
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'okBtnLoading',
          type: 'checkbox',
          templateOptions: {
            label: 'Ok button loading',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'cancelBtnLoading',
          type: 'checkbox',
          templateOptions: {
            label: 'Cancel button loading',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'centered',
          type: 'checkbox',
          templateOptions: {
            label: 'Centered',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'ecsModalCancel',
          type: 'checkbox',
          templateOptions: {
            label: 'ESC modal cancel',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'showCloseIcon',
          type: 'checkbox',
          templateOptions: {
            label: 'Show close icon',
          },
          defaultValue: false
        },
      ]
    },
  ];
  treeSelectFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'placeHolder',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'placeHolder',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'status',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Status',
            options: [
              {
                label: 'Default',
                value: 'default'
              },
              {
                label: 'error',
                value: 'error'
              },
              {
                label: 'warning',
                value: 'warning'
              },
            ]
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'size',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Size',
            options: [
              {
                label: 'Default',
                value: 'default'
              },
              {
                label: 'Small',
                value: 'small'
              },
              {
                label: 'Large',
                value: 'large'
              },
            ]
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'api',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Api',
            options: [
              {
                label: 'Api',
                value: 'treeSelectApi'
              },
            ]
          }
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'showSearch',
          type: 'checkbox',
          templateOptions: {
            label: 'Show Search',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'disabled',
          type: 'checkbox',
          templateOptions: {
            label: 'Disabled',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'width',
          type: 'checkbox',
          templateOptions: {
            label: 'Width as Parent',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'checkable',
          type: 'checkbox',
          templateOptions: {
            label: 'Checkable',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'showExpand',
          type: 'checkbox',
          templateOptions: {
            label: 'Show Expand',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'showLine',
          type: 'checkbox',
          templateOptions: {
            label: 'Show Line',
          },
          defaultValue: false
        },

      ]
    },
  ];
  treeviewFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [


        {
          className: "w-1/4 px-1",
          key: 'api',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Api',
            options: [
              {
                label: 'Api',
                value: 'treeSelectApi'
              },
            ]
          }
        },
        {
          className: "w-1/4 px-2",
          key: 'directoryTree',
          type: 'checkbox',
          templateOptions: {
            label: 'Directory Tree',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 px-2",
          key: 'blockNode',
          type: 'checkbox',
          templateOptions: {
            label: 'Block Node',
          },
          defaultValue: false
        },

      ]
    },
  ];
  treeFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'expandIcon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Icon',
          },

        },
        // {
        //   className: "w-1/4 mt-5 px-2",
        //   key: 'closingexpandicon',
        //   type: 'input',
        //   templateOptions: {
        //     label: 'Close Icon',
        //   },

        // },
        {
          className: "w-1/4 px-1",
          key: 'api',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Api',
            options: [
              {
                label: 'Api',
                value: 'treeApi'
              },
            ]
          }
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'checkable',
          type: 'checkbox',
          templateOptions: {
            label: 'Show checkBox',
          },
          defaultValue: true
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'expand',
          type: 'checkbox',
          templateOptions: {
            label: 'Show Icon',
          },
          defaultValue: true
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'showLine',
          type: 'checkbox',
          templateOptions: {
            label: 'Show line',
          },
          defaultValue: true
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'blockNode',
          type: 'checkbox',
          templateOptions: {
            label: 'Block node',
          },
          defaultValue: true
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'showIcon',
          type: 'checkbox',
          templateOptions: {
            label: 'Show icon',
          },
          defaultValue: true
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'asyncData',
          type: 'checkbox',
          templateOptions: {
            label: 'Async data',
          },
          defaultValue: true
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'draggable',
          type: 'checkbox',
          templateOptions: {
            label: 'Draggable',
          },
          defaultValue: true
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'multiple',
          type: 'checkbox',
          templateOptions: {
            label: 'Multiple',
          },
          defaultValue: true
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'expandAll',
          type: 'checkbox',
          templateOptions: {
            label: 'Expandall',
          },
          defaultValue: true
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'checkStricktly',
          type: 'checkbox',
          templateOptions: {
            label: 'Check Stricktly',
          },
          defaultValue: true
        },
      ]
    },
  ];
  cascaderFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'expandTrigger',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Trigger',
            options: [
              {
                label: 'Click',
                value: 'click'
              },
              {
                label: 'Hover',
                value: 'hover'
              },
            ]
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'placeHolder',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'PlaceHolder',
          },
        },
        {
          className: "w-1/4 px-1",
          key: 'size',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Size',
            options: [
              {
                label: 'Default',
                value: 'default'
              },
              {
                label: 'Large',
                value: 'large'
              },
              {
                label: 'Small',
                value: 'small'
              },
            ]
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'status',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Status',
            options: [
              {
                label: 'Error',
                value: 'error'
              },
              {
                label: 'Warning',
                value: 'warning'
              },
            ]
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'expandIcon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Expand Icon',
          },
        },
        {
          className: "w-1/4 px-1",
          key: 'api',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Api',
            options: [
              {
                label: 'Api',
                value: 'cascaderApi'
              },
            ]
          }
        },

        {
          className: "w-1/4 mt-5 px-2",
          key: 'showInput',
          type: 'checkbox',
          templateOptions: {
            label: 'ShowInput',
          },
          defaultValue: true
        },

        {
          className: "w-1/4 mt-5 px-2",
          key: 'disabled',
          type: 'checkbox',
          templateOptions: {
            label: 'Disabled',
          },
          defaultValue: true
        },

      ]
    },
  ];
  iconFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'icon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          templateOptions: {
            label: 'Icon',
          },
        },
      ]
    },
  ];
}


export const onlyNumberParser = (value: any, index: number) => {
  return value.replace(/[^0-9]+/g, '');
};
