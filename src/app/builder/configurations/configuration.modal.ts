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
          //   props: {
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
            props: {
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
        props: {
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
              props: {
                label: 'value'
              }
            },
            {
              key: 'label',
              type: 'input',
              className: "ml-2",
              wrappers: ["formly-vertical-wrapper"],
              props: {
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
            props: {
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
        props: {
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
              props: {
                label: 'label'
              }
            },
            {
              className: "ml-2",
              key: 'value',
              type: 'input',
              wrappers: ["formly-vertical-wrapper"],
              props: {
                label: 'value'
              }
            },

          ]
        }
      }
    ]


  //Button Json
  buttonFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          key: 'color',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: "color",
            label: 'Background color'
          }
        },
        {
          key: 'hoverColor',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: "color",
            label: 'Background color on hover'
          }
        },

        {
          key: 'format',
          type: 'select',
          className: "w-1/4 px-1",
          "wrappers": ["formly-vertical-wrapper"],
          props: {
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
          key: 'nztype',
          type: 'select',
          className: "w-1/4 px-1",
          "wrappers": ["formly-vertical-wrapper"],
          props: {
            label: 'Button Type',
            options: [
              {
                label: 'Default',
                value: 'default'
              },
              {
                label: 'Primary',
                value: 'primary'
              },
              {
                label: 'Dashed',
                value: 'dashed'
              },
              {
                label: 'Text',
                value: 'text'
              },
            ]
          },
        },
        {
          key: 'nzSize',
          type: 'select',
          className: "w-1/4 px-1",
          "wrappers": ["formly-vertical-wrapper"],
          props: {
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
          props: {
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
          props: {
            label: 'Button Icon'
          }
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'disabled',
          type: 'checkbox',
          props: {
            label: 'Disabled',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'nzGhost',
          type: 'checkbox',
          props: {
            label: 'Ghost',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'nzLoading',
          type: 'checkbox',
          props: {
            label: 'Loading',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'nzBlock',
          type: 'checkbox',
          props: {
            label: 'Block',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'nzDanger',
          type: 'checkbox',
          props: {
            label: 'Danger',
          },
          defaultValue: false
        },

      ]
    },
  ];
  zorroSelectFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          key: 'optionHieght',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'Option Hieght',

          },
        },
        // {
        //   key: 'optionHoverSize',
        //   type: 'input',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
        //     type:'number',
        //     label: 'Option Hover Size',
        //   },
        // },
        {
          key: 'icon',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Remove Icon',
          },
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'allowClear',
          type: 'checkbox',
          props: {
            label: 'AllowClear',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'serveSearch',
          type: 'checkbox',
          props: {
            label: 'Serve Search',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'showArrow',
          type: 'checkbox',
          props: {
            label: 'Show Arrow',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'showSearch',
          type: 'checkbox',
          props: {
            label: 'Show Search',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'loading',
          type: 'checkbox',
          props: {
            label: 'Loading',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'optionDisabled',
          type: 'checkbox',
          props: {
            label: 'option Disabled',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'optionHide',
          type: 'checkbox',
          props: {
            label: 'option Hide',
          },
          defaultValue: false
        },
        {
          key: 'options',
          type: 'repeatSection',
          className: "w-full px-1",
          props: {
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
                props: {
                  label: 'label'
                }
              },
              {
                className: "ml-2",
                key: 'value',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'value'
                }
              },
            ]
          }
        }
      ]
    },
  ];
  zorroTimeFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          key: 'firstBtnText',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'First button text',

          },
        },
        {
          key: 'secondBtnText',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Second button text',
          },
        },
        {
          key: 'minuteStep',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'minuteStep',
          },
        },
        {
          key: 'secondStep',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'secondStep',
          },
        },
        {
          key: 'hoursStep',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'hoursStep',
          },
        },
        {
          key: 'icon',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'icon',
          },
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'allowClear',
          type: 'checkbox',
          props: {
            label: 'AllowClear',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'use12Hours',
          type: 'checkbox',
          props: {
            label: 'Use 12 Hours',
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
          props: {
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
          props: {
            label: 'Button Text'
          }
        },

        {
          key: 'color',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: "color",
            label: 'Background color'
          }
        },
        {
          key: 'hoverColor',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: "color",
            label: 'Background color on hover'
          }
        },
        {
          key: 'btnIcon',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Button Icon'
          }
        },
        {
          key: 'format',
          type: 'select',
          className: "w-1/4 px-1",
          "wrappers": ["formly-vertical-wrapper"],
          props: {
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
          props: {
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
          props: {
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
          props: {
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
          props: {
            label: 'Disabled',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-3",
          key: 'nzGhost',
          type: 'checkbox',
          props: {
            label: 'Ghost',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-3",
          key: 'visible',
          type: 'checkbox',
          props: {
            label: 'Visible',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-3",
          key: 'clickHide',
          type: 'checkbox',
          props: {
            label: 'Click Hide',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'nzBlock',
          type: 'checkbox',
          props: {
            label: 'Block',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-3",
          key: 'nzLoading',
          type: 'checkbox',
          props: {
            label: 'Loading',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-3",
          key: 'nzDanger',
          type: 'checkbox',
          props: {
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
          props: {
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
                props: {
                  label: 'label'
                }
              },
              {
                key: 'link',
                type: 'input',
                className: "ml-2",
                wrappers: ["formly-vertical-wrapper"],
                props: {
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
          props: {
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
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: "color",
            label: 'Background color'
          }
        },
        {
          key: 'hoverColor',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: "color",
            label: 'Background color on hover'
          }
        },
        {
          key: 'format',
          type: 'select',
          className: "w-1/4 px-1",
          "wrappers": ["formly-vertical-wrapper"],
          props: {
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
          props: {
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
          props: {
            label: 'Button Icon'
          }
        },
        {
          key: 'href',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Link'
          }
        },
        {
          key: 'nzSize',
          type: 'select',
          className: "w-1/4 px-1",
          "wrappers": ["formly-vertical-wrapper"],
          props: {
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
          props: {
            label: 'Ghost',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'nzBlock',
          type: 'checkbox',
          props: {
            label: 'Block',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'nzLoading',
          type: 'checkbox',
          props: {
            label: 'Loading',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'nzDanger',
          type: 'checkbox',
          props: {
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
  //   props: {
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
          props: {
            label: 'Default Color',
            type: 'color'
            // value:"#038edc",
          },
        },
      ]
    },
  ];
  autoCompleteFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          key: 'optionWidth',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: "number",
            label: 'Option Width',
          },
        },
        {
          key: 'options',
          type: 'repeatSection',
          className: "w-full px-1",
          props: {
            canAdd: true,
            canRemove: true
          },
          fieldArray: {
            fieldGroup: [
              {
                key: 'label',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'label'
                }
              },
              {
                className: "ml-2",
                key: 'value',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'value'
                }
              },

            ]
          }
        }
      ]
    },
  ];
  zorroDateFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          key: 'format',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Format',
            options: [
              {
                label: "MM-yyyy-dd",
                value: "MM-yyyy-dd"
              },
              {
                label: "yyyy-MM-dd",
                value: "yyyy-MM-dd"
              },
              {
                label: "dd-MM-yyyy",
                value: "dd-MM-yyyy"
              },
            ]
          },
        },
      ]
    },
  ];
  numberFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          key: 'maxLength',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'max Length',

          },
        },
        {
          key: 'minLength',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'minLength',

          },
        },
        {
          key: 'step',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'Step',

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
          props: {
            label: 'link',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'icon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'icon',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'name',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Name'
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'total',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'Total'
          }
        },

        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-3",
        //   props: {
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
          props: {
            label: 'Sub Label',
          }
        },

        {
          key: 'link',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
        //   props: {
        //     label: 'Repeat'
        //   },
        // },
        {
          template: '<div class="bold-label mt-3">options</div>'
        },
        {
          key: 'options',
          type: 'repeatSection',
          props: {
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
              //   props: {
              //     label: 'Filtertype'
              //   }
              // },
              {
                key: 'price',
                type: 'input',
                className: "w-1/4 px-1",
                // wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'price'
                }
              },
              {
                key: 'data',
                type: 'input',
                className: "w-1/4 px-1",
                // wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'Data'
                }
              },
              {
                key: 'colors',
                type: 'input',
                className: "w-1/4 px-1",
                // wrappers: ["formly-vertical-wrapper"],
                props: {
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
              //   props: {
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
        //   props: {
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
        //         props: {
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
        //               props: {
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
        //               props: {
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
        //               props: {
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
          props: {
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
        //   props: {
        //     label: 'Repeat'
        //   },
        // },
        {
          template: '<div class="bold-label mt-3">options</div>',
        },
        {
          key: 'options',
          type: 'repeatSection',
          props: {
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
                props: {
                  type: 'number',
                  label: 'Series'
                }
              },

              {
                key: 'color',
                type: 'input',
                className: "w-1/3",
                wrappers: ["formly-vertical-wrapper"],
                props: {
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
                props: {
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
          props: {
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
          props: {
            label: 'This Title',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'lastTitle',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Last Title',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'prevTitle',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Prev Title',
          }
        },

        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-5",
        //   props: {
        //     label: 'Repeat'
        //   },
        // },
        {
          template: '<div class="bold-label mt-3">options</div>'
        },
        {
          key: 'options1',
          type: 'repeatSection',
          props: {
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
                props: {
                  label: 'This Value',
                }
              },
              {
                className: "w-1/3",
                key: 'growth',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'Growth',
                }
              },
              {
                className: "w-1/3",
                key: 'lastValue',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'Last Value',
                }
              },
              {
                className: "w-1/3",
                key: 'prevValue',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
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
          props: {
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
                props: {
                  type: "number",
                  label: 'Series'
                }
              },

              {
                className: "w-1/3",
                key: 'color',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  type: "color",
                  label: 'Color'
                }
              },

              {
                className: "w-1/3",
                key: 'api',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'Api'
                }
              },
              // {
              //   key: 'Direct',
              //   type: 'input',
              //   wrappers: ["formly-vertical-wrapper"],
              //   props: {
              //     label: 'Direct Label'
              //   }
              // },
              // {
              //   key: 'Others',
              //   type: 'input',
              //   wrappers: ["formly-vertical-wrapper"],
              //   props: {
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
          props: {
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
          props: {
            type: "number",
            label: 'Below Percentage',
          }
        },
        {
          key: 'below_percentage_color',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
            label: 'Icon',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'limit',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'Limit',
          }
        },

        {
          key: 'link',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
        //   props: {
        //     label: 'Repeat'
        //   },
        // },
        {
          template: '<div class="bold-label mt-3">options</div>',
        },
        {
          key: 'options',
          type: 'repeatSection',
          props: {
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
              //   props: {
              //     label: 'Title'
              //   }
              // },
              {
                key: 'percentage',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'percentage'
                }
              },
              {
                key: 'min',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'min'
                }
              },
              {
                key: 'max',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'max'
                }
              },
              {
                key: 'bar',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'bar'
                }
              },
              {
                key: 'api',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
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
          props: {
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
          props: {
            type: "number",
            label: 'Number Of Columns',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'belowpercentage',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: "number",
            label: 'Below Percentage',
          }
        },
        {
          key: 'below_percentage_color',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
            label: 'Icon',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'limit',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'Limit',
          }
        },


        {
          key: 'link',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
        //   props: {
        //     label: 'Repeat'
        //   },
        // },

        {
          template: '<div class="bold-label mt-3">options</div>',
        },
        {
          key: 'options',
          type: 'repeatSection',
          props: {
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
                props: {
                  label: 'Title'
                }
              },
              {
                key: 'percentage',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'percentage'
                }
              },
              {
                key: 'min',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'min'
                }
              },
              {
                key: 'max',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'max'
                }
              },
              {
                key: 'bar',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'bar'
                }
              },
              {
                // className: "ml-2",
                key: 'api',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
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
          props: {
            type: 'number',
            label: 'Limit',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'percentage',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'Below Percentage',
          }
        },
        {
          key: 'below_percentage_color',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
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
        //   props: {
        //     label: 'Repeat'
        //   },
        // },
        {
          template: '<div class="bold-label mt-3">options</div>',
        },
        {
          key: 'options',
          type: 'repeatSection',
          props: {
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
                props: {
                  label: 'Title'
                }
              },
              {
                key: 'total',
                type: 'input',
                className: 'col',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'total'
                }
              },
              {
                key: 'percentage',
                type: 'input',
                className: 'col',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'percentage'
                }
              },
              {
                key: 'data',
                type: 'input',
                className: 'col',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'data'
                }
              },
              {
                key: 'api',
                type: 'input',
                className: 'col',
                wrappers: ["formly-vertical-wrapper"],
                props: {
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
          props: {
            type: 'number',
            label: 'Limit',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'percentage',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'Below Percentage',
          }
        },
        {
          key: 'below_percentage_color',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
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
        //   props: {
        //     label: 'Repeat'
        //   },
        // },
        {
          template: '<div class="bold-label mt-3">options</div>',
        },
        {
          key: 'options',
          type: 'repeatSection',
          props: {
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
                props: {
                  label: 'Title'
                }
              },
              {
                className: "col",
                // className: "ml-2",
                key: 'icon',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'Icon'
                }
              },
              // {
              //   className: "w-1/6 px-1",
              //   // className: "ml-2",
              //   key: 'icon',
              //   type: 'input',
              //   wrappers: ["formly-vertical-wrapper"],
              //   props: {
              //     label: 'Icon'
              //   }
              // },
              {
                className: "col",
                // className: "ml-2",
                key: 'total',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'total'
                }
              },
              {
                className: "col",
                // className: "ml-2",
                key: 'percentage',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'percentage'
                }
              },
              {
                className: "col",
                // className: "ml-2",
                key: 'api',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
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
        //   props: {
        //     label: 'Icon'
        //   }
        // },
        // {
        //   className: "w-1/4 px-1",
        //   key: 'name',
        //   type: 'input',
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
        //     label: 'Name'
        //   }
        // },
        // {
        //   className: "w-1/4 px-1",
        //   key: 'total',
        //   type: 'input',
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
        //     label: 'Total'
        //   }
        // },
        // {
        //   className: "w-1/4 px-1",
        //   key: 'percentage',
        //   type: 'input',
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
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
          props: {
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
        //   props: {
        //     label: 'Repeat'
        //   },
        // },
        {
          template: '<div class="bold-label mt-3">options</div>'
        },
        {
          key: 'options',
          type: 'repeatSection',
          props: {
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
                props: {
                  label: 'Label'
                }
              },
              {
                className: "w-1/3 px-1",
                key: 'value',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'Value'
                }
              },
              {
                className: "w-1/3 px-1",
                key: 'name',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'Title'
                }
              },
              {
                className: "w-1/3 px-1",
                // className: "ml-2",
                key: 'data',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'data'
                }
              },
              {
                key: 'type',
                type: 'select',
                className: "w-1/3 px-1",
                wrappers: ["formly-vertical-wrapper"],
                props: {
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
                props: {
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
          props: {
            label: 'Heading Level',
            options: [
              {
                label: 'h1',
                value: 1
              },
              {
                label: 'h2',
                value: 2
              },
              {
                label: 'h3',
                value: 3
              },
              {
                label: 'h4',
                value: 4
              },
              {
                label: 'h5',
                value: 5
              },
            ]
          },
          // defaultValue: 'w-1/3'
        },
        {
          key: 'textAlign',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Text align',
            options: [
              {
                label: 'Left',
                value: 'text-left'
              },
              {
                label: 'right',
                value: 'text-right'
              },
              {
                label: 'center',
                value: 'text-center'
              },
            ]
          },
        },
        {
          key: 'fontstyle',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
            type: 'color',
            label: 'Heading Color',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'headingApi',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {

            label: 'Heading Api',
          }
        },

        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-3",
        //   props: {
        //     label: 'Repeat'
        //   },
        // },
        {
          className: "w-full",
          key: 'text',
          type: 'textarea',
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          className: "w-1/4 px-1",
          key: 'beforecopyIcon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Before copy Icon',
          }
        },
        // {
        //   className: "w-1/4 px-1",
        //   key: 'aftercopyIcon',
        //   type: 'input',
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
        //     label: 'After copy Icon',
        //   }
        // },
        // {
        //   className: "w-1/4 px-1",
        //   key: 'copyTooltips',
        //   type: 'input',
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
        //     label: 'copy Tooltip',
        //   }
        // },
        {
          className: "w-1/4 px-1",
          key: 'editableIcon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Edit Icon',
          }
        },
        // {
        //   className: "w-1/4 px-1",
        //   key: 'editableTooltip',
        //   type: 'input',
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
        //     label: 'Editable Tooltip',
        //   }
        // },
        {
          className: "w-1/4 px-1",
          key: 'suffix',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Suffix',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'ellipsisRows',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'ellips Rows',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'color',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'color',
            label: 'Heading Color',
          }
        },
        {
          key: 'fontstyle',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          key: 'nztype',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Type',
            options: [
              {
                label: 'default',
                value: 'default'
              },
              {
                label: 'Success',
                value: 'success'
              },
              {
                label: 'Secondary',
                value: 'secondary'
              },
              {
                label: 'Warning',
                value: 'warning'
              },
              {
                label: 'Danger',
                value: 'danger'
              },
            ]
          },

        },
        {
          key: 'editable',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'Editable'
          },
        },
        {
          key: 'copyable',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'Copyable'
          },
        },
        {
          key: 'ellipsis',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'Ellipsis'
          },
        },
        //   {
        //   key: 'editable',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-5",
        //   props: {
        //     label: 'Editable'
        //   },
        // },
        {
          key: 'expandable',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'Expandable'
          },
        },
        {
          key: 'disabled',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'Disabled'
          },
        },
        {
          className: "w-full",
          key: 'text',
          type: 'textarea',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Text',
            rows: 3
          }
        },
        // {
        //   key: 'api',
        //   type: 'select',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
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
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-5",
        //   props: {
        //     label: 'Repeat'
        //   },
        // },

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
          props: {
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
          props: {
            label: 'icon',
          }
        },
        {
          key: 'subtitle',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Subtitle'
          },
        },
        {
          key: 'description',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'description',
          }
        },
        // {
        //   key: 'percentage',
        //   type: 'number',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
        //     label: 'percentage',
        //   }
        // },
        {
          key: 'status',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
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
        // {
        //   key: 'selectedIndex',
        //   type: 'input',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
        //     type: 'number',
        //     label: 'Selected Index',
        //   }
        // },
        {
          key: 'direction',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
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
          props: {
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
          props: {
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
        // {
        //   key: 'status',
        //   type: 'select',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
        //     label: 'Status',
        //     options: [
        //       {
        //         label: 'wait',
        //         value: 'wait'
        //       },
        //       {
        //         label: 'process',
        //         value: 'process'
        //       },
        //       {
        //         label: 'finish',
        //         value: 'finish'
        //       },
        //       {
        //         label: 'error',
        //         value: 'error'
        //       },
        //     ]
        //   }
        // },
        {
          key: 'nodes',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'Number of Steppers',
          }
        },
        // {
        //   key: 'stepperFormat',
        //   type: 'select',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
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
        //   props: {
        //     type: 'color',
        //     label: 'Select Color',
        //   }
        // },
        // {
        //   key: 'defaultColor',
        //   type: 'input',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
        //     type: 'color',
        //     label: 'Default Color',
        //   }
        // },


        // {
        //   key: 'nextButtonText',
        //   type: 'input',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
        //     label: 'Next Button Text',
        //   }
        // },
        // {
        //   key: 'nextButtonIcon',
        //   type: 'input',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
        //     label: 'Next Button Icon',
        //   }
        // },
        // {
        //   key: 'nextButtonColor',
        //   type: 'select',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
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
        //   props: {
        //     label: 'Back Button Text',
        //   }
        // },
        // {
        //   key: 'backButtonIcon',
        //   type: 'input',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
        //     label: 'Back Button Icon',
        //   }
        // },
        // {
        //   key: 'backButtonColor',
        //   type: 'select',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
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
        //   props: {
        //     label: 'Submit Button Text',
        //   }
        // },
        // {
        //   key: 'submitButtonIcon',
        //   type: 'input',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
        //     label: 'Submit Button Icon',
        //   }
        // },
        // {
        //   key: 'submitButtonColor',
        //   type: 'select',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
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
        //   props: {
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
        //   props: {
        //     label: 'Label',
        //     pattern: '^\\S*$',
        //   }
        // },
        {
          key: 'stepperLabel',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Label',
          }
        },
        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-5",
        //   props: {
        //     label: 'Repeat'
        //   },
        // },
        // {
        //   key: 'stepperFormat',
        //   type: 'select',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
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
          props: {
            label: 'Icon',
          }
        },
        {
          key: 'disabled',
          type: 'checkbox',
          className: "w-1/6 px-1 ",
          props: {
            label: 'Disabled'
          },
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
          props: {
            label: 'selectedIndex',
          }
        },
        {
          key: 'tabPosition',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          key: 'size',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
            ],
          },
        },
        {
          key: 'nodes',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'Number of Nodes',
          }
        },
        {
          key: 'tabType',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
            label: 'Hidetabs'
          },
        },
        {
          key: 'animated',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'Animated'
          },
        },
        {
          key: 'centerd',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
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
          props: {
            label: 'Icon',
          }
        },
        {
          key: 'link',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
            label: 'Expanded Icon',
          }
        },
        // {
        //   key: 'extra',
        //   type: 'input',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
        //     label: 'Extra',
        //   }
        // },
        {
          key: 'nzExpandIconPosition',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
            label: 'Bordered'
          },
          defaultValue: false
        },
        {
          key: 'nzGhost',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'Transparent'
          },
          defaultValue: false
        },
        {
          key: 'nzDisabled',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'Disables'
          },
          defaultValue: false
        },
        {
          key: 'nzShowArrow',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
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
          key: 'title',
          type: 'input',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'label'
          }
        },
      ]
    },
    {
      template: '<div class="bold-label mt-3">Variables</div>',
    },
    {
      key: 'options',
      type: 'repeatSection',
      props: {
        style: "margin-top: 6%;",
        canAdd: true,
        canRemove: true
      },
      fieldArray: {
        className: 'ml-3 me-2',
        fieldGroup: [
          {
            key: 'VariableName',
            type: 'input',
            className: "ml-2",
            wrappers: ["formly-vertical-wrapper"],
            props: {
              label: 'Variable Name',
              pattern: '^\\S*$'
            }
          },
          // {
          //   key: 'value',
          //   type: 'select',
          //   className: "w-1/4 px-1",
          //   wrappers: ["formly-vertical-wrapper"],
          //   props: {
          //     label: 'Select API',
          //     options: [
          //       {
          //         label: 'String',
          //         value: 'string'
          //       },
          //       {
          //         label: 'Number',
          //         value: 'number'
          //       },
          //       {
          //         label: 'Decimal',
          //         value: 'decimal'
          //       }
          //     ]
          //   },
          // },
        ]
      }
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
          props: {
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
          props: {
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
          props: {
            label: 'Enable Header'
          },
          defaultValue: false
        },
        {
          key: 'isBordered',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'isBordered'
          },
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
          props: {
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
        //   props: {
        //     label: 'Label',
        //     pattern: '^\\S*$',
        //   }
        // },
        {
          key: 'sectionClassName',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Input Class',
          }
        },
        {
          key: 'wrappers',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
                label: 'Floating Filled',
                value: 'floating_filled'
              },
              {
                label: 'Floating Outlined',
                value: 'floating_outlined'
              },
              {
                label: 'Floating Standard',
                value: 'floating_standard'
              },

            ],
          },
          // defaultValue: 'Vertical'
        },
        {
          key: 'formatAlignment',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Format Alignment',
            options: [
              {
                label: 'LTR',
                value: 'ltr'
              },
              {
                label: 'RTL',
                value: 'rtl'
              },
            ]
          },
        },
        {
          key: 'labelPosition',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          key: 'size',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Size',
            options: [
              {
                label: 'small',
                value: 'small'
              },
              {
                label: 'large',
                value: 'large'
              },
              {
                label: 'default',
                value: 'default'
              },
            ]
          },
        },
        {
          key: 'status',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
              {
                label: 'NO',
                value: ''
              },
            ]
          },
        },
        {
          key: 'disabled',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
        //   props: {
        //     label: 'Disabled'
        //   },
        // },

        // {
        //   key: 'isExpanded',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-2",
        //   props: {
        //     label: 'Is Collepse'
        //   },
        // },
        // {
        //   key: 'footer',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-2",
        //   props: {
        //     label: 'Enable Footer'
        //   },
        //   defaultValue: false
        // },
        // {
        //   key: 'header',
        //   type: 'checkbox',
        //   className: "w-1/3 mt-2",
        //   props: {
        //     label: 'Enable Header'
        //   },
        //   defaultValue: false
        // }
        {
          key: 'repeatable',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'Repeatable '
          },
        },
        {
          key: 'isBordered',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'isBordered'
          },
        },
        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-5",
        //   props: {
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
          props: {
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
          props: {
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
          props: {
            label: 'Back Ground Color',
            type: 'color',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'textColor',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Text Color',
            type: 'color',
          }
        },
        {
          key: 'header',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'Enable Header'
          },
          defaultValue: false
        },
        {
          key: 'expanded',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'Is Collapse'
          },
          defaultValue: false,
        },
        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-3",
        //   props: {
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
        //   props: {
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
          props: {
            label: 'Enable Footer'
          },
          defaultValue: false
        },
        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-5",
        //   props: {
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
        // {
        //   key: 'switchType',
        //   type: 'select',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
        //     label: 'Switch Type',
        //     options: [
        //       {
        //         label: 'Default switch',
        //         value: 'defaultSwitch'
        //       },
        //       {
        //         label: 'Checked switch',
        //         value: 'checkedSwitch'
        //       },
        //       {
        //         label: 'Disabled switch',
        //         value: 'disabledSwitch'
        //       },
        //       {
        //         label: 'Disabled checked switch',
        //         value: 'disabledCheckedSwitch'
        //       },
        //       {
        //         label: 'Small Size Switch',
        //         value: 'smallSizeSwitch'
        //       },
        //       {
        //         label: 'Medium Size Switch',
        //         value: 'mediumSizeSwitch'
        //       },
        //       {
        //         label: 'Large Size Switch',
        //         value: 'largeSizeSwitch'
        //       },
        //     ]
        //   },
        // },
        // {
        //   key: 'switchPosition',
        //   type: 'select',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
        //     label: 'Switch Position',
        //     options: [
        //       {
        //         label: 'Left',
        //         value: 'left'
        //       },
        //       {
        //         label: 'Center',
        //         value: 'center'
        //       },
        //       {
        //         label: 'Right',
        //         value: 'right'
        //       },
        //     ]
        //   },
        // },
        {
          key: 'size',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
            label: 'Checked Content'
          }
        },
        {
          className: "w-1/4 px-1 text-black",
          key: 'unCheckedChildren',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Un Checked Content'
          }
        },
        {
          key: 'disabled',
          type: 'checkbox',
          className: "w-1/4 px-1",
          props: {
            label: 'Disabled'
          },
          defaultValue: false
        },
        {
          key: 'loading',
          type: 'checkbox',
          className: "w-1/4 px-1",
          props: {
            label: 'Loading'
          },
          defaultValue: false
        },
        {
          key: 'control',
          type: 'checkbox',
          className: "w-1/4 px-1",
          props: {
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
          props: {
            label: 'Value'
          }
        },
        {
          key: 'color',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
            type: 'number',
            label: 'Height'
          }
        },
        {
          key: 'link',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
            label: 'Show Value'
          },
          defaultValue: false
        },
        {
          key: 'stripped',
          type: 'checkbox',
          className: "col mt-5",
          props: {
            label: 'Show stripped'
          },
        },
        {
          key: 'animated',
          type: 'checkbox',
          className: "col mt-5",
          props: {
            label: 'Show Animated'
          },
        },

        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "col mt-5",
        //   props: {
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
          props: {
            label: 'Divider Text'
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'icon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Icon'
          }
        },
        {
          key: 'dividerType',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
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
          props: {
            label: 'Dashed'
          },
          defaultValue: false,
        },
        {
          key: 'plain',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
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
          props: {
            label: 'Label Icon',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'heading',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Heading'
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'headingIcon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Heading Icon'
          }
        },
        {
          key: 'headingColor',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
            label: 'Sub Heading'
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'subHeadingIcon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'sub Heading Icon'
          }
        },
        {
          key: 'subheadingColor',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
            label: 'Link'
          }
        },
        {
          key: 'api',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
        //   props: {
        //     label: 'Repeat'
        //   },
        // },
        {
          template: '<div class="bold-label mt-3">options</div>',
        },
        {
          key: 'options',
          type: 'repeatSection',
          props: {
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
                props: {
                  label: 'Message'
                }
              },
              {
                className: "w-1/3",
                key: 'dateAndTime',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  type: "datetime-local",
                  label: 'dateAndTime'
                }
              },
              {
                className: "w-1/3",
                key: 'icon',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'First Icon'
                }
              },
              {
                className: "w-1/3",
                key: 'icon1',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
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
          props: {
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
                value: 'bg-black'
              },

            ]
          },

        },
        // {
        //   key: 'icon',
        //   type: 'input',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
        //     label: 'Alert Icon',
        //   },
        // },

        {
          key: 'alertType',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
        //   props: {
        //     label: 'Repeat'
        //   },
        // },

        {
          className: "w-1/4 px-1",
          key: 'description',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Description',

          }
        },
        {
          className: "w-1/4 px-1",
          key: 'action',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Action',

          }
        },
        {
          className: "w-1/4 px-1",
          key: 'closeText',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'CloseText',

          }
        },
        {
          className: "w-1/4 px-1",
          key: 'iconType',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'IconType',

          }
        },
        {
          key: 'banner',
          type: 'checkbox',
          className: "w-1/6 px-1",
          props: {
            label: 'Banner',
          },
          defaultValue: false
        },
        {
          key: 'closeable',
          type: 'checkbox',
          className: "w-1/6 px-1",
          props: {
            label: 'Closeable',
          },
          defaultValue: false
        },
        {
          key: 'showIcon',
          type: 'checkbox',
          className: "w-1/6 px-1",
          props: {
            label: 'ShowIcon',
          },
          defaultValue: false
        },
        {
          className: "w-full mt-2",
          key: 'text',
          type: 'textarea',
          // wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
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
          props: {
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
          props: {
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
          props: {
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
          props: {
            label: 'image Alt',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'imageSrc',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Image Src',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'height',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Height',
          }
        },

        {
          className: "w-1/4 px-1",
          key: 'extra',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Extra',
          }
        },
        {
          key: 'borderless',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'Borderless'
          },
        },


        {
          key: 'hover',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'Hover'
          },
        },

        {
          key: 'loading',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'Loading'
          },
        },
        {
          className: "w-full",
          key: 'headerText',
          type: 'textarea',
          // wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Header Text',
            rows: 3,
          }
        },
        {
          className: "w-full",
          key: 'bodyText',
          type: 'textarea',
          // wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Body Text',
            rows: 3,
          }
        },
        {
          className: "w-full",
          key: 'footerText',
          type: 'textarea',
          // wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
            label: 'MainIcon',
          }
        },

        {
          key: 'mode',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
            label: 'Reverse'
          },
        },


        {
          key: 'options',
          type: 'repeatSection',
          props: {
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
                props: {
                  label: 'Title',
                }
              },
              {
                className: "w-1/4 px-1",
                key: 'dotIcon',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'DotIcon',
                }
              },

              {
                key: 'color',
                type: 'select',
                className: "w-1/4 px-1",
                wrappers: ["formly-vertical-wrapper"],
                props: {
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
          props: {
            label: 'Video Title',
          },
        },
        // {
        //   key: 'videoRatio',
        //   type: 'input',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
        //     label: 'Video Ratio',
        //   },
        // },
        {
          key: 'videoSrc',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Video Source',
          },
        },




        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-5",
        //   props: {
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
        //   props: {
        //     label: 'Audio Title',
        //   },
        // },
        {
          key: 'audioSrc',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
        //   props: {
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
          props: {
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
          props: {
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
          props: {
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
          props: {
            type: 'number',
            label: 'Auto Play Speed'
          },
        },
        {
          key: 'autoPlay',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-3",
          props: {
            label: 'Auto Play'
          },
        },
        {
          key: 'showDots',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-3",
          props: {
            label: 'Show Dots'
          },
        },
        {
          key: 'enableSwipe',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-3",
          props: {
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
          props: {
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
                props: {
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
          props: {
            label: 'Nodes',
          },
        },


        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-3",
        //   props: {
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
          key: 'uploadBtnLabel',
          type: 'input',
          className: "w-1/6 px-1",
          props: {
            label: 'Upload btn label'
          },
        },
        {
          key: 'uploadLimit',
          type: 'input',
          className: "w-1/6 px-1",
          props: {
            type: 'number',
            label: 'Upload limit'
          },
        },
        {
          key: 'size',
          type: 'input',
          className: "w-1/6 px-1",
          props: {
            type: 'number',
            label: 'File size'
          },
        },
        {
          key: 'showDialogueBox',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'Show dialogue box'
          },
        },
        {
          key: 'showUploadlist',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'Show upload list'
          },
        },
        {
          key: 'onlyDirectoriesAllow',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'Only directories allow'
          },
        },
        {
          key: 'multiple',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-3",
          props: {
            label: 'Allow multiple file'
          },
        },
        {
          className: "w-1/6 px-1 mt-3",
          key: 'disabled',
          type: 'checkbox',
          props: {
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
          props: {
            label: 'Type',
            options: [
              {
                label: 'Month',
                value: 'dayGridMonth'
              },
              {
                label: 'Week',
                value: 'timeGridWeek'
              },
              {
                label: 'Day',
                value: 'timeGridDay'
              },
              {
                label: 'List',
                value: 'listWeek'
              },
              {
                label: 'Month And Week',
                value: 'dayGridMonth,timeGridWeek'
              },
              {
                label: 'Month And Day',
                value: 'dayGridMonth,timeGridDay'
              },
              {
                label: 'Week And Day',
                value: 'timeGridWeek,timeGridDay'
              },
              {
                label: 'All',
                value: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
              },
            ]
          },
        },
        {
          key: 'view',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          defaultValue: "w-full",
          props: {
            label: 'View',
            options: [
              {
                label: 'Previous',
                value: 'prev'
              },
              {
                label: 'Next',
                value: 'next'
              },
              {
                label: 'Today',
                value: 'today'
              },
              {
                label: 'Previous and Next',
                value: 'prev,next'
              },
              {
                label: 'Previous, Next and Today',
                value: 'prev,next today'
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
          props: {
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
          className: "w-1/4 px-1",
        },
        {
          className: "w-1/6 px-1",
          key: 'weekends',
          type: 'checkbox',
          props: {
            label: 'Weekends',
          },
          defaultValue: true
        },
        {
          className: "w-1/6 px-1",
          key: 'editable',
          type: 'checkbox',
          props: {
            label: 'Editable',
          },
          defaultValue: true
        },
        {
          className: "w-1/6 px-1",
          key: 'selectable',
          type: 'checkbox',
          props: {
            label: 'Selectable',
          },
          defaultValue: true
        },
        {
          className: "w-1/6 px-1",
          key: 'selectMirror',
          type: 'checkbox',
          props: {
            label: 'Select Mirror',
          },
          defaultValue: true
        },
        {
          className: "w-1/6 px-1",
          key: 'dayMaxEvents',
          type: 'checkbox',
          props: {
            label: 'DayMax Events',
          },
          defaultValue: true
        },
        {
          className: "w-1/6 px-1",
          key: 'details',
          type: 'checkbox',
          props: {
            label: 'Show Events Detail',
          },
          defaultValue: false
        },
        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "col mt-5",
        //   props: {
        //     label: 'Repeat'
        //   },
        // },
        {
          template: '<div class="bold-label mt-3">options</div>',
        },
        {
          key: 'options',
          type: 'repeatSection',
          props: {
            style: "margin-top: 5%;",
            canAdd: true,
            canRemove: true
          },
          fieldArray: {
            className: 'ml-3 me-2',
            fieldGroup: [
              {
                className: "ml-2",
                key: 'title',
                type: 'input',
                props: {
                  label: 'Title'
                }
              },
              {
                className: "ml-2",
                key: 'start',
                type: 'datetime',
                props: {
                  label: 'Start Date'
                }
              },
              {
                className: "ml-2",
                key: 'end',
                type: 'datetime',
                props: {
                  label: 'End Date'
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
          props: {
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
        //   props: {
        //     label: 'Repeat'
        //   },
        // },
        {
          template: '<div class="bold-label mt-3">options</div>',
        },
        {
          key: 'options',
          type: 'repeatSection',
          props: {
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
                props: {
                  label: 'title'
                }
              },
              {
                className: "col",
                key: 'date',
                type: 'input',
                // wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'date'
                }
              },
              {
                className: "col",
                key: 'content',
                type: 'input',
                // wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'content'
                }
              },
              {
                className: "col",
                key: 'users',
                type: 'input',
                // wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'users'
                }
              },
              {
                className: "col",
                key: 'status',
                type: 'input',
                // wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'status'
                }
              },
              {
                key: 'variant',
                type: 'select',
                className: "col",
                // wrappers: ["formly-vertical-wrapper"],
                props: {
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
          props: {
            type: 'number',
            label: 'Nodes',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'icon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
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
          props: {
            label: 'Link',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'icon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
            label: 'Audio Title',
          },
        },
        {
          key: 'audioSrc',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
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
          props: {
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
          props: {
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
          props: {
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
          props: {
            label: 'Button Color',
            options: [
              {
                label: 'Blue',
                value: 'bg-blue-500'
              },
              {
                label: 'Red',
                value: 'bg-red-500'
              },
              {
                label: 'Light Blue',
                value: 'bg-blue-300'
              },
              {
                label: 'Light Gray',
                value: 'bg-gray-300'
              },
              {
                label: 'yellow',
                value: 'bg-yellow-500'
              },
              {
                label: 'gray',
                value: 'bg-gray-500'
              }
            ]
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'btnText',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Button Text',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'icon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Close Icon',
          }
        },
        // {
        //   className: "w-1/4 px-1",
        //   key: 'extra',
        //   type: 'input',
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
        //     label: 'extra ID Refrance',
        //   }
        // },
        {
          className: "w-1/4 px-1",
          key: 'footerText',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Footer Text',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'placement',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
        //   props: {
        //     label: 'Mask Style',
        //   }
        // },
        // {
        //   className: "w-1/4 px-1",
        //   key: 'bodyStyle',
        //   type: 'input',
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
        //     label: 'Body Style',
        //   }
        // },
        {
          className: "w-1/4 px-1",
          key: 'size',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
            type: 'number',
            label: 'Width',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'height',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'Height',
            tooltip: "Height of the Drawer dialog, only when placement is 'top' or 'bottom', having a higher priority than nzSize"
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'offsetX',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Offset X',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'offsetY',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Offset Y',
          }
        },
        // {
        //   className: "w-1/4 px-1",
        //   key: 'wrapClassName',
        //   type: 'input',
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
        //     label: 'wrap ClassName',
        //   }
        // },
        {
          className: "w-1/4 px-1",
          key: 'zIndex',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Z Index',
          }
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'isClosable',
          type: 'checkbox',
          props: {
            label: 'isClosable',
          },
          defaultValue: false
        },
        // {
        //   className: "w-1/6 px-1 mt-2",
        //   key: 'isMask',
        //   type: 'checkbox',
        //   props: {
        //     label: 'isMask',
        //   },
        //   defaultValue: false
        // },
        // {
        //   className: "w-1/6 px-1 mt-2",
        //   key: 'isMaskClosable',
        //   type: 'checkbox',
        //   props: {
        //     label: 'isMaskClosable',
        //   },
        //   defaultValue: false
        // },
        // {
        //   className: "w-1/6 px-1 mt-2",
        //   key: 'isCloseOnNavigation',
        //   type: 'checkbox',
        //   props: {
        //     label: 'isCloseOnNavigation',
        //   },
        //   defaultValue: false
        // },
        {
          className: "w-1/6 px-1 mt-2",
          key: 'isKeyboard',
          type: 'checkbox',
          props: {
            label: 'isKeyboard',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-2",
          key: 'isVisible',
          type: 'checkbox',
          props: {
            label: 'isVisible',
          },
          defaultValue: false
        },
        {
          className: "w-full",
          key: 'content',
          type: 'textarea',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Content',
            rows: 3
          }
        },
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
          props: {
            label: 'Image link'
          }
        },
        // {
        //   className: "w-1/4 px-1",
        //   key: 'content',
        //   type: 'input',
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
        //     label: 'Content Refrance ID'
        //   }
        // },
        {
          className: "w-1/4 px-1",
          key: 'text',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Other Content'
          }
        },
        // {
        //   className: "w-1/4 px-1",
        //   key: 'link',
        //   type: 'input',
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
        //     label: 'Description Link'
        //   }
        // },
        {
          className: "w-1/4 px-1",
          key: 'btnText',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Button Text'
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'color',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
                value: 'bg-black'
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
          props: {
            label: 'Header Text',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'footerText',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Footer Text',
          }
        },
        {
          key: 'formatter',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
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
          props: {
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
          props: {
            label: 'isBordered',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-2",
          key: 'isSplit',
          type: 'checkbox',
          props: {
            label: 'isSplit',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-2",
          key: 'isEdit',
          type: 'checkbox',
          props: {
            label: 'isEdit',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-2",
          key: 'isUpdate',
          type: 'checkbox',
          props: {
            label: 'isUpdate',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-2",
          key: 'isDelete',
          type: 'checkbox',
          props: {
            label: 'isDelete',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-2",
          key: 'isLoad',
          type: 'checkbox',
          props: {
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
          props: {
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
                props: {
                  label: 'Profile Image'
                }
              },
              {
                key: 'name',
                type: 'input',
                className: "w-1/4 px-1",
                // wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'name'
                }
              },
              {
                key: 'description',
                type: 'input',
                className: "w-1/4 px-1",
                // wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'description'
                }
              },
              {
                key: 'email',
                type: 'input',
                className: "w-1/4 px-1",
                // wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'email'
                }
              },
              {
                key: 'lastNameHref',
                type: 'input',
                className: "w-1/4 px-1",
                // wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'last Name Href'
                }
              },
              {
                key: 'content',
                type: 'input',
                className: "w-1/4 px-1",
                // wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'content'
                }
              },
              {
                key: 'isLoading',
                type: 'checkbox',
                className: "w-1/6 px-1 mt-2",
                // wrappers: ["formly-vertical-wrapper"],
                props: {
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
          key: 'btnText',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Button text',
          }
        },
        {
          key: 'formatter',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
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
          props: {
            label: 'isBordered',
          },
          defaultValue: false
        },
        {
          className: "w-1/6 px-1 mt-2",
          key: 'isColon',
          type: 'checkbox',
          props: {
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
          key: 'count',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'Count',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'nzText',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Text',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'icon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Icon `if type icon`',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'nzColor',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'color',
            label: 'Color',
          }
        },
        {
          key: 'nztype',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Type',
            options: [
              {
                label: 'Count',
                value: 'count'
              },
              {
                label: 'Icon',
                value: 'icon'
              },
              {
                label: 'Dot',
                value: 'dot'
              },
              {
                label: 'Ribbon',
                value: 'ribbon'
              },
            ]
          }
        },
        {
          key: 'nzStatus',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
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
        //   props: {
        //     label: 'Title',
        //   }
        // },
        {
          className: "w-1/4 px-1",
          key: 'overflowCount',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'OverflowCount',
          }
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'standAlone',
          type: 'checkbox',
          // wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'StandAlone',
          }
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'status',
          type: 'checkbox',
          // wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Status',
          }
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'showZero',
          type: 'checkbox',
          // wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
            label: 'content',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'nzStatus',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'nzStatus',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'nzSpan',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
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
          props: {
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
          props: {
            type: 'number',
            label: 'margin'
          }
        },
        {
          className: "w-1/6 px-1 mt-5",
          key: 'target',
          type: 'checkbox',
          props: {
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
          props: {
            label: 'Icon',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'text',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Text',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'src',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Image src',
          }
        },
        // {
        //   className: "w-1/4 px-1",
        //   key: 'alt',
        //   type: 'input',
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
        //     label: 'Imag alt',
        //   }
        // },
        {
          className: "w-1/4 px-1",
          key: 'size',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
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
          props: {
            type: "color",
            label: 'Bg-color',
          },
        },
        {
          key: 'color',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: "color",
            label: 'Color',
          },
        },
        // {
        //   key: 'gap',
        //   type: 'input',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
        //     type: "number",
        //     label: 'Gap',
        //   },
        // },
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
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'Visible After',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'target',
          type: 'checkbox',
          props: {
            label: 'Target',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 px-1",
          key: 'duration',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
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
          props: {
            label: 'Avatar',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'author',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
            label: 'Button Label',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'content',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Popover Content',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'mouseEnterDelay',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'Mouse enter delay',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'mouseLeaveDelay',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'Mouse leave delay',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'trigger',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
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
          props: {
            label: 'Arrow Point At Center',
          },
          defaultValue: false
        },
        {
          className: "col mt-5",
          key: 'visible',
          type: 'checkbox',
          props: {
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
          props: {
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
          props: {
            type: 'number',
            label: 'Delay time',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'loaderText',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Loader text',
          }
        },
        {
          className: "col mt-5",
          key: 'spinning',
          type: 'checkbox',
          props: {
            label: 'Spinning',
          },
          defaultValue: false
        },
        {
          className: "col mt-5",
          key: 'simple',
          type: 'checkbox',
          props: {
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
          props: {
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
          props: {
            label: 'Result Title',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'subTitle',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Sub Title',
          }
        },


        {
          className: "w-1/4 px-1",
          key: 'icon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Icon',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'extra',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Extra',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'btnLabel',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
            label: 'Time Out',
            type: 'number',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'message',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Message',
          }
        },
        {
          key: 'toastrType',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
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
          props: {
            label: 'progressBar',
          },
        },
        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "col mt-5",
        //   props: {
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
          props: {
            label: 'invoice number label',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'datelabel',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Date Label',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'paymentTermsLabel',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Payment Terms Label',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'billToLabel',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'BillTo Label',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'dueDateLabel',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Due Date Label',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'poNumber',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'PO Number',
          }
        },
        {
          key: 'shipToLabel',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Ship To Label',
          }
        },
        {
          key: 'notesLabel',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Notes Label',
          }
        },
        {
          key: 'subtotalLabel',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Subtotal Label',
          }
        },
        {
          key: 'dicountLabel',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Dicount Label',
          }
        },
        {
          key: 'shippingLabel',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Shipping Label',
          }
        },
        {
          key: 'taxLabel',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Tax Label',
          }
        },
        {
          key: 'termsLabel',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Terms Label',
          }
        },
        {
          key: 'totalLabel',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Total Label',
          }
        },
        {
          key: 'amountpaidLabel',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Amount Paid Label',
          }
        },
        {
          key: 'balanceDueLabel',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
            label: 'Alt',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'source',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Image Source',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'imagHieght',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'Imag Hieght',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'imageWidth',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'Image Width',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'zoom',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'zoom',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'rotate',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'rotate',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'zIndex',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'zIndex',
          }
        },
        {
          key: 'imageClass',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
            label: 'Image Upload',
          }
        },
        {
          key: 'keyboardKey',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'keyboard Key'
          },
        },
        {
          key: 'imagePreview',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
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
          props: {
            label: 'Min',
            type: 'number',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'max',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Max',
            type: 'number',
          }
        },
        // {
        //   key: 'sliderType',
        //   type: 'select',
        //   className: "w-1/4 px-1",
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
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
          props: {
            label: 'Disabled',
          },
        },


        {
          className: "w-1/3 mt-3",
          key: 'showValue',
          type: 'checkbox',
          props: {
            label: 'Show range value',
          },
        },
        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-3",
        //   props: {
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
          props: {
            label: 'Icon',
          }
        },

        {
          className: "w-1/4 px-1",
          key: 'link',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Link',
          }
        },
        {
          key: 'isTitle',
          type: 'checkbox',
          className: "w-1/3 mt-2",
          props: {
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
          props: {
            label: 'Footer Text'
          }
        },
        {
          key: 'nzTitle',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Header Text'
          }
        },
        {
          key: 'nzPaginationPosition',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
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
          props: {
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
          props: {
            label: 'Api',
            options: [
              { value: 'gridNewApi', label: 'Api' },

            ]
          },
        },
        {
          key: 'sortOrder',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Sort Order',
            options: [
              { value: 'descend', label: 'Descend' },
              { value: 'ascend', label: 'Ascend' },
              { value: null, label: 'No Need' },

            ]
          },
        },
        {
          key: 'sortDirections',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Sort Direction',
            options: [
              { value: '["ascend"]', label: "Ascend" },
              { value: '["descend"]', label: "Descend" },
              { value: "[\"ascend\",\"descend\"]", label: "Ascend And Descend" },
              { value: "[\"ascend\", \"descend\", null]", label: "All" },
              { value: '[null]', label: "No Need" },

            ]
          },
        },
        {
          key: 'filterMultiple',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'Filter Multiple',
          },
          defaultValue: false
        },
        {
          key: 'nzLoading',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'Loading',
          },
          defaultValue: false
        },
        {
          key: 'nzShowPagination',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'Show Pagination',
          },
          defaultValue: false
        },
        {
          key: 'nzBordered',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'Show Border',
          },
          defaultValue: false
        },
        {
          key: 'showColumnHeader',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'Column Header',
          },
        },
        {
          key: 'noResult',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'No Result',
          },
          defaultValue: false
        },
        {
          key: 'nzShowSizeChanger',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'PageSizeChanger',
          },
          defaultValue: false
        },
        {
          key: 'nzSimple',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'Simple Pagination',
          },
          defaultValue: false
        },
        {
          key: 'showCheckbox',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
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
          props: {
            style: "margin-top: 6%;",
            canAdd: true,
            canRemove: true
          },
          fieldArray: {
            className: 'ml-3 me-2',
            fieldGroup: [
              {
                key: 'id',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'id'
                }
              },
              {
                key: 'key',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'key'
                }
              },
              {
                key: 'name',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'Header'
                }
              },
              {
                className: "ml-2",
                key: 'show',
                type: 'checkbox',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'Is Show'
                }
              },
             {
               className: "ml-2",
                key: 'listOfFilter',
                type: 'input',
                wrappers: ["formly-vertical-wrapper"],
                props: {
                  label: 'Filter List'
                }
              },
              // {
              //   key: 'sortOrder',
              //   type: 'input',
              //   wrappers: ["formly-vertical-wrapper"],
              //   props: {
              //     label: 'Column Name'
              //   }
              // },
              // {
              //   key: 'sortDirections',
              //   type: 'input',
              //   wrappers: ["formly-vertical-wrapper"],
              //   props: {
              //     label: 'sortDirections'
              //   }
              // },
              // {
              //   key: 'filterMultiple',
              //   type: 'input',
              //   wrappers: ["formly-vertical-wrapper"],
              //   props: {
              //     label: 'filterMultiple'
              //   }
              // }
              // {
              //   className: "ml-2",
              //   key: 'showColumn',
              //   type: 'checkbox',
              //   wrappers: ["formly-vertical-wrapper"],
              //   props: {
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
          props: {
            type: 'number',
            label: 'Pagination'
          }
        },
        {
          key: 'link',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
            label: 'Delete API'
          }
        },

        // {
        //   key: 'delete',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-3",
        //   props: {
        //     label: 'Delete',
        //   },
        // },
        // {
        //   key: 'update',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-3",
        //   props: {
        //     label: 'Update',
        //   },
        // },
        // {
        //   key: 'create',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-3",
        //   props: {
        //     label: 'Create',
        //   },
        // },
        {
          key: 'sortable',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'Enable Sorting',
          },
        },
        {
          key: 'filter',
          type: 'checkbox',
          className: "w-1/6 px-1 mt-5",
          props: {
            label: 'Enable Filter'
          },
        },

        // {
        //   key: 'repeat',
        //   type: 'checkbox',
        //   className: "w-1/6 px-1 mt-3",
        //   props: {
        //     label: 'Repeat'
        //   },
        // },
        {
          template: '<div class="bold-label mt-3">options</div>',
        },

        {
          key: 'options',
          type: 'repeatSection',
          props: {
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
                props: {
                  label: 'key',

                },
              },
              {
                key: 'header',
                type: 'input',
                className: "w-1/3",
                props: {
                  label: 'header',
                }
              },
              {
                key: 'rule',
                type: 'input',
                className: "w-1/3",
                props: {
                  label: 'Rule',
                }
              },
              {
                key: 'showColumn',
                type: 'checkbox',
                className: "w-1/12 mt-4",
                props: {
                  label: 'Show'
                },
                defaultValue: false
              },
              {
                key: 'sumColumn',
                type: 'checkbox',
                className: "w-1/12 mt-4",
                props: {
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
      props: {
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
          props: {
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
          props: {
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
          props: {
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
          props: {
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
          props: {
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
          props: {
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
          props: {
            label: 'Pattern',
          },
          expressionProperties: {
            hide: "model.type!='pattern'",
          }
        },
        // {
        //   key: 'emailTypeAllow',
        //   type: 'repeatSection',
        //   props: {
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
        //         props: {
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
          props: {
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
          props: {
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
          props: {
            config: {},
            label: 'label'
          }
        },
        {
          className: "w-1/4 px-2",
          key: 'tooltip',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            config: {},
            label: 'Tooltip',
          }
        },
        {
          className: "w-1/4 px-2",
          key: 'className',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            config: {},
            label: 'column',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'titleIcon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            config: {},
            label: 'Label Icon',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'placeholder',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Placeholder',
          }
        },

        {
          key: 'defaultValue',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            config: {},
            label: 'Default Value'
          },
        },
        {
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          key: 'addonLeft',
          type: 'input',
          props: {
            config: {},
            label: 'Add On Left Text'
          }
        },
        {
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          key: 'addonRight',
          type: 'input',
          props: {
            config: {},
            label: 'Add On Right Text'
          }
        },
        {
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          key: 'suffixicon',
          type: 'input',
          props: {
            config: {},
            label: 'Add On Left Icon'
          }
        },
        {
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          key: 'prefixicon',
          type: 'input',
          props: {
            config: {},
            label: 'Add On Right Icon'
          }
        },
        {
          key: 'rows',
          type: 'input',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
            label: 'Autofocus'
          },
          defaultValue: false
        },
        {
          className: "mt-5 px-2",
          key: 'required',
          type: 'checkbox',
          props: {
            label: 'required'
          },
          defaultValue: false
        },
        {
          className: "mt-5 px-2",
          key: 'readonly',
          type: 'checkbox',
          props: {
            label: 'Readonly'
          },
          defaultValue: false
        },
        {
          className: "mt-5 px-2",
          key: 'disabled',
          type: 'checkbox',
          props: {
            label: 'Disabled',
          },
          defaultValue: false
        },
        {
          className: "mt-5 px-2",
          key: 'hideExpression',
          type: 'checkbox',
          props: {
            label: 'Hide',
          },
          defaultValue: false
        },
        {
          className: "mt-5 px-2",
          key: 'border',
          type: 'checkbox',
          props: {
            label: 'Border',
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
          props: {
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
          props: {
            label: 'ID',
            pattern: '^\\S*$',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'title',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'label'
          }
        },
        {
          className: "w-1/4 px-2",
          key: 'tooltip',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Tooltip',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'className',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'className',
          },
          defaultValue: 'w-1/4  px-1'
        },
        {
          className: "w-1/4 px-1",
          key: 'getVariable',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'getVariable',
            options:[]
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'setVariable',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'setVariable',
            options:[]
          }
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'hideExpression',
          type: 'checkbox',
          props: {
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
          props: {
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
          props: {
            label: 'ID',
            pattern: '^\\S*$',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'title',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
            label: 'Prefix',
          }
        },
        {
          className: "w-1/4 px-2",
          key: 'suffixIcon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Suffix',
          }
        },
        {
          key: 'options',
          type: 'repeatSection',
          className: "w-full",
          props: {
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
                props: {
                  label: 'Title'
                }
              },
              {
                key: 'value',
                type: 'input',
                className: "w-1/4 px-1",
                props: {
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
          props: {
            type: 'number',
            label: 'Default Selected Index',
          }
        },
        {
          className: "w-1/4 px-2 d-none",
          key: 'size',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
            label: 'Disabled',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'block',
          type: 'checkbox',
          props: {
            label: 'block',
          },
          defaultValue: false
        },
        {
          key: 'options',
          type: 'repeatSection',
          props: {
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
                props: {
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
          props: {
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
          props: {
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
          props: {
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
          props: {
            label: 'Loading',
          },
          defaultValue: false
        },

        // {
        //   className: "w-1/4 mt-5 px-2",
        //   key: 'disabled',
        //   type: 'checkbox',
        //   props: {
        //     label: 'Disabled',
        //   },
        //   defaultValue: false
        // },
        {
          key: 'options',
          type: 'repeatSection',
          props: {
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
                props: {
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
        {
          className: "w-1/4 px-2",
          key: 'mode',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Mode',
            options: [
              {
                label: 'closeable ',
                value: 'closeable'
              },
              {
                label: 'Default ',
                value: 'default'
              },
              {
                label: 'Checkable',
                value: 'checkable'
              },
            ]
          }
        },
        {
          key: 'options',
          type: 'repeatSection',
          className: "w-1/4",
          props: {
            canAdd: true,
            canRemove: true
          },
          fieldArray: {
            fieldGroup: [
              {
                key: 'title',
                type: 'input',
                props: {
                  label: 'Label'
                }
              },
              {
                key: 'tagColor',
                type: 'input',
                props: {
                  label: 'Color'
                }
              },
              {
                key: 'icon',
                type: 'input',
                props: {
                  label: 'Icon'
                }
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
          props: {
            label: 'Content',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'duration',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'Duration',
          }
        },
        {
          className: "w-1/4 px-2 d-none",
          key: 'messageType',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
            label: 'Pause OnHover',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'animate',
          type: 'checkbox',
          props: {
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
          props: {
            label: 'Content',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'icon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Icon',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'color',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'color',
            label: 'Color',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'duration',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'Duration',
          }
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'pauseOnHover',
          type: 'checkbox',
          props: {
            label: 'Pause OnHover',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'animate',
          type: 'checkbox',
          props: {
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
          props: {
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
          props: {
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
          props: {
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
          props: {
            type: 'number',
            label: 'Percent',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'success',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'Success Percentage',
          }
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'showInfo',
          type: 'checkbox',
          props: {
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
          props: {
            label: 'Icon',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'showCount',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'Show number ',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'ngvalue',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'Value',
          }
        },

        {
          className: "w-1/4 px-1 mt-5",
          key: 'allowHalf',
          type: 'checkbox',
          props: {
            label: 'Allow Half',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 px-1 mt-5",
          key: 'focus',
          type: 'checkbox',
          props: {
            label: 'Focus',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 px-1",
          key: 'clear',
          type: 'checkbox',
          props: {
            label: 'Click clear',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 px-1",
          key: 'disabled',
          type: 'checkbox',
          props: {
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
          props: {
            label: 'First box title',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'secondBoxTitle',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Second box title',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'leftButtonLabel',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Left button label',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'rightButtonLabel',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Right button label',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'searchPlaceHolder',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Search placeHolder',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'notFoundContentLabel',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Not found content label',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'status',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          key: 'api',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
            label: 'Disabled',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'showSearch',
          type: 'checkbox',
          props: {
            label: 'ShowSearch',
          },
          defaultValue: false
        },
        {
          key: 'options',
          type: 'repeatSection',
          className: "w-full",
          props: {
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
                props: {
                  label: 'key'
                }
              },
              {
                key: 'title',
                type: 'input',
                className: "w-1/4 px-1",
                props: {
                  label: 'title'
                }
              },
              {
                key: 'direction',
                type: 'input',
                className: "w-1/4 px-1",
                props: {
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
          props: {
            label: 'Button Label',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'modalContent',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Modal Content',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'modalTitle',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Modal title',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'cancalButtontext',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Cancal button text',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'okBtnText',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Ok btn text',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'closeIcon',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Close Icon',
          }
        },
        // {
        //   className: "w-1/4 px-1",
        //   key: 'zIndex',
        //   type: 'input',
        //   wrappers: ["formly-vertical-wrapper"],
        //   props: {
        //     type:'number',
        //     label: 'Z-Index',
        //   }
        // },
        {
          className: "w-1/4 px-1",
          key: 'width',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'Width',
          }
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'okBtnLoading',
          type: 'checkbox',
          props: {
            label: 'Ok button loading',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'cancelBtnLoading',
          type: 'checkbox',
          props: {
            label: 'Cancel button loading',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'centered',
          type: 'checkbox',
          props: {
            label: 'Centered',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'ecsModalCancel',
          type: 'checkbox',
          props: {
            label: 'ESC modal cancel',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'showCloseIcon',
          type: 'checkbox',
          props: {
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
          props: {
            label: 'placeHolder',
          }
        },
        {
          className: "w-1/4 px-1",
          key: 'status',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
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
          props: {
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
          props: {
            label: 'Show Search',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'disabled',
          type: 'checkbox',
          props: {
            label: 'Disabled',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'width',
          type: 'checkbox',
          props: {
            label: 'Width as Parent',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'checkable',
          type: 'checkbox',
          props: {
            label: 'Checkable',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'showExpand',
          type: 'checkbox',
          props: {
            label: 'Show Expand',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'showLine',
          type: 'checkbox',
          props: {
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
          props: {
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
          props: {
            label: 'Directory Tree',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 px-2",
          key: 'blockNode',
          type: 'checkbox',
          props: {
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
          props: {
            label: 'Icon',
          },
        },
        // {
        //   className: "w-1/4 mt-5 px-2",
        //   key: 'closingexpandicon',
        //   type: 'input',
        //   props: {
        //     label: 'Close Icon',
        //   },

        // },
        {
          className: "w-1/4 px-1",
          key: 'api',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
            label: 'Show checkBox',
          },
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'expand',
          type: 'checkbox',
          props: {
            label: 'Show Expand Icon',
          },
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'showLine',
          type: 'checkbox',
          props: {
            label: 'Show line',
          },
        },
        // {
        //   className: "w-1/4 mt-5 px-2",
        //   key: 'blockNode',
        //   type: 'checkbox',
        //   props: {
        //     label: 'Block node',
        //   },
        // },
        // {
        //   className: "w-1/4 mt-5 px-2",
        //   key: 'showIcon',
        //   type: 'checkbox',
        //   props: {
        //     label: 'Show icon',
        //   },
        // },
        // {
        //   className: "w-1/4 mt-5 px-2",
        //   key: 'asyncData',
        //   type: 'checkbox',
        //   props: {
        //     label: 'Async data',
        //   },
        // },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'draggable',
          type: 'checkbox',
          props: {
            label: 'Draggable',
          },
        },
        // {
        //   className: "w-1/4 mt-5 px-2",
        //   key: 'multiple',
        //   type: 'checkbox',
        //   props: {
        //     label: 'Multiple',
        //   },
        // },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'expandAll',
          type: 'checkbox',
          props: {
            label: 'Expandall',
          },
        },
        // {
        //   className: "w-1/4 mt-5 px-2",
        //   key: 'checkStricktly',
        //   type: 'checkbox',
        //   props: {
        //     label: 'Check Stricktly',
        //   },
        // },
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
          props: {
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
          props: {
            label: 'PlaceHolder',
          },
        },
        {
          className: "w-1/4 px-1",
          key: 'size',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
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
          props: {
            label: 'Expand Icon',
          },
        },
        {
          className: "w-1/4 px-1",
          key: 'api',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          props: {
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
          props: {
            label: 'ShowInput',
          },
          defaultValue: true
        },

        {
          className: "w-1/4 mt-5 px-2",
          key: 'disabled',
          type: 'checkbox',
          props: {
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
          props: {
            label: 'Icon',
          },
        },
        {
          className: "w-1/4 px-1",
          key: 'iconType',
          type: 'select',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Icon type',
            options: [
              {
                label: 'Icon outlined',
                value: 'outline'
              },
              {
                label: 'Icon filled',
                value: 'fill'
              },
              {
                label: 'Icon twotone',
                value: 'twotone'
              },
              {
                label: 'Font Awsome',
                value: 'font_awsome'
              },
              {
                label: 'Material',
                value: 'material'
              },
            ]
          },
        },
      ]
    },
  ];
  anchorFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "flex flex-wrap",
      fieldGroup: [
        {
          className: "w-1/4 px-1",
          key: 'offSetTop',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'Padding From top',
          },
        },
        {
          className: "w-1/4 px-1",
          key: 'bond',
          type: 'input',
          wrappers: ["formly-vertical-wrapper"],
          props: {
            type: 'number',
            label: 'Bond Distance',
          },
        },
        {
          key: 'api',
          type: 'select',
          className: "w-1/4 px-1",
          wrappers: ["formly-vertical-wrapper"],
          props: {
            label: 'Select API',
            options: [
              {
                label: "Api",
                value: "anchor"
              },
            ]
          },
        },
        {
          key: 'affix',
          className: "w-1/4 mt-5 px-2",
          type: 'checkbox',
          props: {
            label: 'Fixed',
          },
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'showInkInFixed',
          type: 'checkbox',
          props: {
            label: 'Show balls',
          },
          defaultValue: false
        },
        {
          className: "w-1/4 mt-5 px-2",
          key: 'target',
          type: 'checkbox',
          props: {
            label: 'Show target div',
          },
          defaultValue: false
        },
      ]
    },
  ];
}


export const onlyNumberParser = (value: any, index: number) => {
  return value.replace(/[^0-9]+/g, '');
};
