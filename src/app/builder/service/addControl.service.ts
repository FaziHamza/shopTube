import { Injectable } from "@angular/core";
import { Guid } from "src/app/models/guid";

@Injectable({
  providedIn: 'root'
})
export class AddControlService {

  getPageControl() {
    return {
      footer: false, header: false,
      options: [
        {
          VariableName: ''
        }
      ],
      isNextChild: true,
    }
  }
  getPageHeaderControl() {
    return {
      headingSize: "text-xl",
      footer: false,
      header: true,
      isBordered: true,
      labelPosition: 'text-left',
      alertPosition: 'topHeader',
      isNextChild: true,
    }
  }
  getPageBodyControl() {
    return {
      footer: false, header: false, isNextChild: true,
    }
  }
  getPageFooterControl() {
    return {
      footer: false,
      header: false,
      isNextChild: true,
    }
  }
  getSectionControl() {
    return {
      sectionClassName: "",
      footer: false,
      header: false,
      borderColor: "",
      sectionDisabled: "editable",
      labelPosition: "text-left",
      isNextChild: true,
      repeatable: false,
      isBordered: true,
      size: 'default',
      status: '',
    }
  }
  getHeaderControl() {
    return {
      footer: false,
      headingSize: "",
      expanded: false,
      header: true,
      labelPosition: "text-left",
      isNextChild: true,
      backGroundColor: "#FFFFFF",
      textColor: "#000000",
    }
  }
  getBodyControl() {
    return {
      backGroundColor: "#FFFFFF",
      textColor: "#000000",
      footer: false,
      header: false,
      isNextChild: true,
    }
  }
  getFooterControl() {
    return {
      backGroundColor: "#FFFFFF",
      textColor: "#000000",
      footer: false,
      header: false,
      isNextChild: true,
    }
  }
  getButtonGroupControl() {
    return {
      isNextChild: true, btngroupformat: "text-left",
    }
  }
  getInsertButtonControl() {
    return {
      type: "button",
      actionType: "insert",
      isNextChild: false,
      className: "w-1/3",
      color: "",
      hoverColor: "",
      btnIcon: "upload",
      format: "text-left",
      disabled: false,
      nzDanger: false,
      nzBlock: false,
      nztype: "default",
      nzSize: "large",
      nzShape: 'default',
      iconType: 'outline',
      nzLoading: false,
      nzGhost: false,
      iconSize: 15,
      hoverTextColor: '',
      textColor: '',
      isSubmit: false, btnType: "",
      href: "",
    }
  }
  getDropdownButtonControl() {
    return {
      isNextChild: false,
      className: "w-1/3",
      color: "",
      hoverColor: "",
      btnIcon: "down",
      format: "text-left",
      disabled: false,
      nzDanger: false,
      nzBlock: false,
      nzSize: "default",
      nzShape: 'default',
      trigger: 'hover',
      placement: 'bottomLeft',
      visible: true,
      clickHide: false,
      nzLoading: false,
      nzGhost: false,
      iconType: 'outline',
      nztype: "default",
      textColor: "",
      iconSize: 15,
      hoverTextColor: '',
      dropdownOptions: [
        {
          label: "Option 1",
          link: "1",
        },
        {
          label: "Option 2",
          link: "2",
        },
        {
          label: "Option 3",
          link: "3",
        },
        {
          label: "Option 4",
          link: "4",
        },
      ],
    }
  }
  getCardWithComponentsControl() {
    return {
      isNextChild: true,
      borderless: false,
    }
  }
  getSwitchControl() {
    return {
      switchPosition: "left", isNextChild: false,
      switchType: "defaultSwitch",
      size: 'default',
      checkedChildren: '',
      unCheckedChildren: '',
      disabled: false,
      loading: false,
      control: false,
      model: false,
    }
  }
  getImageUploadControl() {
    return {
      imageClass: "",
      alt: "",
      source: "https://cdn.pixabay.com/photo/2016/04/04/14/12/monitor-1307227__340.jpg",
      imagHieght: 200,
      imageWidth: 200,
      isNextChild: false,
      base64Image: "",
      imagePreview: true,
      keyboardKey: true,
      zoom: 1.5,
      rotate: 0,
      zIndex: 1000,
    }
  }
  getProgressBarControl() {
    return {
      progressBarType: 'line',
      isNextChild: false,
      percent: 30,
      showInfo: true,
      status: 'success',
      strokeLineCap: 'round',
      success: 30,
    }
  }
  getVideoControl() {
    return {
      isNextChild: false,
      videoRatio: "ratio ratio-1x1",
      videoSrc: "https://www.youtube.com/embed/1y_kfWUCFDQ",
    }
  }
  getAudioControl() {
    return {
      isNextChild: false,
      audioSrc: "https://pagalfree.com/musics/128-Rasiya%20-%20Brahmastra%20128%20Kbps.mp3",
    }
  }
  getCarouselCrossfadeControl() {
    return {
      effect: "scrollx",
      isNextChild: false,
      dotPosition: "bottom",
      autoPlay: true,
      autolPlaySpeed: 3000,
      showDots: true,
      enableSwipe: true,
      carousalConfig: [
        {
          img: "assets/images/small/img-1.jpg",
        },
        {
          img: "assets/images/small/img-2.jpg",
        },
        {
          img: "assets/images/small/img-3.jpg",
        }
      ],
    }
  }
  getCalenderControl() {
    const TODAY_STR = new Date().toISOString().replace(/T.*$/, '');
    return {
      view: 'prev,next today',
      viewType: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
      // disabled: false,
      weekends: true,
      editable: true,
      selectable: true,
      isNextChild: false,
      selectMirror: true,
      dayMaxEvents: true,
      details: true,
      options: [
        {
          id: 1,
          title: 'All-day event',
          start: TODAY_STR,
          backgroundColor: '#fbe0e0',
          textColor: '#ea5455',
          color: '#EF6C00',
          borderColor: '#ea5455'
        },
        {
          id: 2,
          title: 'Timed event',
          start: TODAY_STR,
          end: TODAY_STR,
          backgroundColor: '#fbe0e0',
          textColor: '#ea5455',
          color: '#EF6C00',
          borderColor: '#ea5455'
        },
        {
          id: 3,
          title: 'Timed event',
          start: TODAY_STR,
          end: TODAY_STR,
          backgroundColor: '#fbe0e0',
          textColor: '#ea5455',
          color: '#EF6C00',
          borderColor: '#ea5455'
        }
      ],
    }
  }
  getSharedMessagesChartControl() {
    return {
      labelIcon: "uil-shutter-alt",
      heading: "Latest to do's",
      isNextChild: false,
      headingIcon: "fas fa-exclamation-triangle",
      headingColor: "text-warning",
      subHeading: "Latest finished to do's",
      subHeadingIcon: "fa fa-check",
      subheadingColor: 'text-success',
      link: '',
      sharedMessagesConfig: [
        {
          message: "Bill's place for a.",
          dateAndTime: "2022-11-05 04:21:01",
          icon: "uil-pen",
          icon1: "uil-times",
        }
      ],
    }
  }
  getAlertControl() {
    return {
      alertColor: "bg-blue-200 text-blue-600",
      text: "This is an alert—check it out!",
      icon: "",
      isNextChild: false,
      alertType: 'success',
      banner: false,
      showIcon: false,
      closeable: false,
      iconType: '',
      description: '',
    }
  }
  getSimpleCardWithHeaderBodyFooterControl() {
    return {
      textAlign: "text-left",
      textSize: "h1",
      headerText: "Card header",
      bodyText: "card body",
      footerText: "card footer",
      link: '',
      height: '100p',
      borderless: false,
      isNextChild: true,
      extra: '',
      hover: false,
      loading: false,
      nztype: 'default',
      size: 'default',
      imageSrc: '',
      imageAlt: '',
      description: 'Description',
      // bgColorHeader:'',
      // bgColorBody:'',
      // bgColorFooter:'',
      bgColor: '',
      footer: false,
    }
  }
  getTabsControl() {
    return {
      disabled: false,
      isNextChild: true,
      icon: 'star',
      iconType: 'outline',
      iconSize: 15,
    }
  }
  getMainTabControl() {
    return {
      selectedIndex: 0,
      animated: true,
      size: 'default',
      tabPosition: 'top',
      tabType: 'line',
      isNextChild: true,
      hideTabs: false,
      nodes: "3",
      centerd: false,
    }
  }
  getMainStepControl() {
    return {
      stepperType: 'default',
      selectedIndex: 0,
      direction: 'horizontal',
      placement: 'horizontal',
      isNextChild: true,
      size: 'default',
      status: 'process',
      disabled: false,
      nodes: "3",
    }
  }
  getStepControl() {
    return {
      icon: 'star',
      className: "w-full",
      disabled: false,
      description: "description",
      isNextChild: true,
      status: '',
      subtitle: '',
      percentage: '',
      iconType: 'outline',
      iconSize: 15,
    }
  }
  getKanbanControl() {
    return {
      nodes: "3",
      isNextChild: true,
      kambanChildren: [],
    }
  }
  getKanbanTaskControl() {
    return {
      isNextChild: false,
      date: "14 Oct, 2019",
      content: "In enim justo rhoncus ut",
      users: [
        {
          "name": "Emily Surface"
        }
      ],
      status: "open",
      variant: "bg-primary",
    }
  }
  getLinkbuttonControl() {
    return {
      color: "",
      hoverColor: "",
      target: "_blank",
      isNextChild: false,
      btnType: "_blank",
      href: "",
      format: "text-left",
      btnIcon: "",
      nzSize: "default",
      nzShape: 'default',
      iconType: 'outline',
      iconSize: 15,
    }
  }
  simplecardControl() {
    return {
      icon: "uil uil-list-ul",
      name: "Total Tasks",
      isNextChild: false,
      total: "21",
    }
  }
  chartcardControl() {
    return {

    }
  }
  sectionCardControl() {
    return {

    }
  }
  widgetSectionCardControl() {
    return {

    }
  }
  donutChartControl() {
    return {

    }
  }
  browserChartControl() {
    return {

    }
  }
  browserCombineChartControl() {
    return {

    }
  }
  donuteSaleChartControl() {
    return {

    }
  }
  salesAnalyticschartControl() {
    return {

    }
  }
  headingControl() {
    return {
      isNextChild: false,
      style: "font-weight:bold;",
      textAlign: "text-left",
      color: '#000000',
      headingApi: "",
      text: "Editor.js",
      heading: 3,
      fontstyle: 'font-normal',
    }
  }
  paragraphControl() {
    return {
      editable: false,
      color: '',
      fontstyle: 'font-normal',
      text: 'A random paragraph generate when add paragraph componenet',
      editableTooltip: '',
      copyable: false,
      copyTooltips: '',
      isNextChild: false,
      ellipsis: false,
      suffix: '',
      disabled: false,
      expandable: false,
      ellipsisRows: 1,
      nztype: 'default',
      beforecopyIcon: '',
      aftercopyIcon: '',
      editableIcon: '',
    }
  }
  htmlBlockControl() {
    return {
      style: "font-weight:normal;",
      textAlign: "text-align:left;",
      isNextChild: false,
      fontSize: "font-weight:normal;text-align:left;",
      api: "",
      data: {
        text: "Lorem ipsum Hi  sit amet consectetur adipisicing elit. Dolorum minus aliquid earum voluptatum eum quis vero facere, veritatis nisi porro minima sed harum aperiam! Voluptas distinctio consequuntur ipsa enim obcaecati"
      },
    }
  }
  textEditorControl() {
    return {
      isNextChild: false,
      editorJson: "",
    }
  }
  editor_jsControl() {
    return {
      isNextChild: false,

    }
  }
  breakTagControl() {
    return {
      isNextChild: false,
      className: "w-full",
    }
  }
  multiFileUploadControl() {
    return {
      uploadBtnLabel: "Click here to upload",
      multiple: false,
      disabled: false,
      showDialogueBox: true,
      showUploadlist: true,
      onlyDirectoriesAllow: false,
      isNextChild: false,
      uploadLimit: 10,
      size: 30,
    }
  }
  gridListControl() {
    return {
      tableId: "gridList_" + Guid.newGuid(),
      nzFooter: "This is footer",
      nzTitle: "This is Title",
      nzPaginationPosition: "bottom",
      nzPaginationType: "default",
      nzLoading: false,
      nzFrontPagination: true,
      nzShowPagination: true,
      nzBordered: false,
      showColumnHeader: true,
      noResult: false,
      nzSimple: false,
      nzSize: 'default',
      isNextChild: false,
      nzShowSizeChanger: false,
      showCheckbox: true,
      expandable: true,
      fixHeader: false,
      tableScroll: false,
      fixedColumn: false,
      sort: true,
      filter: true,
      isAddRow: true,
      tableHeaders: [
        {
          name: 'Id',
          key: 'Id',
          sortOrder: null,
          sortFn: (a: any, b: any) => a.name.localeCompare(b.name),
          sortDirections: ['ascend', 'descend', null],
          filterMultiple: true,
          show: true,
          sum: false,
          // listOfFilter: [
          //   { text: 'Joe', value: 'Joe' },
          //   { text: 'Jim', value: 'Jim', byDefault: true }
          // ],
          // filterFn: (list: string[], item: any) => list.some(name => item.name.indexOf(name) !== -1)
        },
        {
          name: 'Name',
          key: 'Name',
          sortOrder: null,
          sortFn: (a: any, b: any) => a.name.localeCompare(b.name),
          sortDirections: ['ascend', 'descend', null],
          filterMultiple: true,
          show: true,
          sum: false,
          listOfFilter: [
            // { text: 'Joe', value: 'Joe' },
            // { text: 'Jim', value: 'Jim', byDefault: true }
          ],
          filterFn: (list: string[], item: any) => list.some(name => item.name.indexOf(name) !== -1)
        },
        {
          name: 'Age',
          key: 'Age',
          sortOrder: 'descend',
          sortFn: (a: any, b: any) => a.age - b.age,
          sortDirections: ['descend', null],
          listOfFilter: [],
          filterFn: null,
          sum: false,
          show: true,
          filterMultiple: false
        },
        {
          name: 'Address',
          key: 'Address',
          sortOrder: null,
          sortDirections: ['ascend', 'descend', null],
          sortFn: (a: any, b: any) => a.address.length - b.address.length,
          filterMultiple: false,
          show: true,
          sum: false,
          listOfFilter: [
            { text: 'London', value: 'London' },
            { text: 'Sidney', value: 'Sidney' }
          ],
          filterFn: (address: string, item: any) => item.address.indexOf(address) !== -1
        }
      ],
      tableData: [
        {
          id: 1,
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          description: 'My name is John Brown, I am 2 years old, living in New York No',
          checked: false,
          expand: false,
          children: [
            {
              id: 1,
              name: 'test',
            },
            {
              id: 2,
              name: 'test2'
            },
          ]
        },
        {
          id: 2,
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          description: 'My name is John Brown, I am 2 years old, living in New York No',
          checked: false,
          expand: false
        },
        {
          id: 3,
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          description: 'My name is John Brown, I am 2 years old, living in New York No',
          checked: false,
          expand: false
        },
        {
          id: 4,
          name: 'Jim Red',
          age: 32,
          address: 'London No. 2 Lake Park',
          description: 'My name is John Brown, I am 2 years old, living in New York No',
          checked: false,
          expand: false
        }
      ],
    }
  }
  invoiceGridControl() {
    return {
      pagination: 10,
      filter: false,
      sortable: false,
      isNextChild: false,
      delete: true,
      update: false,
      create: false,
      children: [
        {
          "id": "description",
          "label": "description",
          "type": "input",
          "header": "description",
          "name": "description",
          "showColumn": true,
          "filter": false,
          "editorType": false,
          "sortable": false,
          "editor": {
            "type": "text"
          },
          "children": []
        },
        {
          "id": "quantity",
          "label": "quantity",
          "type": "input",
          "header": "quantity",
          "name": "quantity",
          "showColumn": true,
          "filter": false,
          "sortable": false,
          "editorType": false,
          "editor": {
            "type": "text"
          },
          "children": []
        },
        {
          "id": "price",
          "label": "price",
          "type": "input",
          "header": "price",
          "name": "price",
          "showColumn": true,
          "filter": false,
          "sortable": false,
          "editorType": false,
          "editor": {
            "type": "text"
          },
          "children": []
        },
        {
          "id": "amount",
          "label": "amount",
          "type": "input",
          "header": "amount",
          "name": "amount",
          "showColumn": true,
          "filter": false,
          "sortable": false,
          "editorType": false,
          "editor": {
            "type": "text"
          },
          "children": []
        }
      ],
      rowData: [
        {
          id: 1,
          "description": "aa",
          "quantity": 10,
          "price": 10,
          "amount": 100,
        },
        {

          "description": "bb",
          "quantity": 10,
          "price": 10,
          "amount": 100,
        },
        {
          "description": "cc",
          "quantity": 10,
          "price": 10,
          "amount": 100,
        },
        {
          "description": "baby_ruth",
          "quantity": 10,
          "price": 10,
          "amount": 100,
        },
      ],
      columnData: [],
    }
  }
  columnControl() {
    return {
      isNextChild: false,
      gridList: [
        {
          header: "Id " + Math.random().toFixed(3),
          name: "id " + Math.random().toFixed(3),
          textArea: ""
        }
      ],
    }
  }
  timelineControl() {
    return {
      pendingText: "Recording...",
      mainIcon: "loading",
      reverse: false,
      labelText: '',
      isNextChild: false,
      mode: 'left',
      data: [
        {
          title: "Timeline Event One",
          dotIcon: 'loading',
          color: 'green',
          date: '11-Apr-2023',
          timeLineDescription: 'description',
        },
        {
          title: "Timeline Event two",
          dotIcon: 'down',
          timecolor: 'green',
          date: '11-Apr-2023',
          timeLineDescription: 'description',
        },
        {
          title: "Timeline Event three",
          dotIcon: 'loading',
          timecolor: 'green',
          date: '11-Apr-2023',
          timeLineDescription: 'description',
        },
        {
          title: "Timeline Event One",
          dotIcon: 'loading',
          timecolor: 'green',
          date: '11-Apr-2023',
          timeLineDescription: 'description',
        },
        {
          title: "Timeline Event One",
          dotIcon: 'loading',
          timecolor: 'green',
          date: '11-Apr-2023',
          timeLineDescription: 'description',
        },
        {
          title: "Timeline Event One",
          dotIcon: 'loading',
          timecolor: 'green',
          date: '11-Apr-2023',
          timeLineDescription: 'description',
        },
        {
          title: "Timeline Event One",
          dotIcon: 'loading',
          timecolor: 'green',
          date: '11-Apr-2023',
          timeLineDescription: 'description',
        },
      ],
    }
  }
  fixedDivControl() {
    return {
      isNextChild: true,
      fixedDivConfig: [
        {
          key: "fixedDiv" + Guid.newGuid(),

        }
      ],
      fixedDivChild: [],
    }
  }
  accordionButtonControl() {
    return {
      nzBordered: true,
      nzGhost: false,
      nzExpandIconPosition: "left",
      nzDisabled: false,
      isNextChild: true,
      nzExpandedIcon: '',
      nzShowArrow: true,
      extra: '',
    }
  }
  dividerControl() {
    return {
      dividerClassName: "w-1/4",
      dividerText: "Divider",
      icon: "plus",
      isNextChild: true,
      dashed: false,
      dividerType: "horizontal",
      orientation: "center",
      dividerFormat: "1px solid rgba(0,0,0,.06)",
      plain: false,
    }
  }
  toastrControl() {
    return {
      toastrType: "success",
      toasterTitle: "Title",
      isNextChild: false,
      duration: 3000,
      placement: "topRight",
      closeIcon: "close-circle",
      description: "message",
      animate: true,
      pauseOnHover: true,
    }
  }
  rateControl() {
    return {
      clear: true,
      allowHalf: true,
      focus: true,
      isNextChild: false,
      icon: 'star',
      showCount: 5,
      ngvalue: 0,
      disabled: false,
      options: ['terrible', 'bad', 'normal', 'good', 'wonderful'],
    }
  }
  rangeSliderControl() {
    return {
      min: '0',
      isNextChild: false,
      max: '2',
      disabled: false,
      showValue: false,
    }
  }
  invoiceControl() {
    return {
      invoiceNumberLabel: "Invoice Number",
      poNumber: "PO Number",
      datelabel: "Date Label",
      paymentTermsLabel: "Payment Terms",
      billToLabel: "Bill To ",
      dueDateLabel: "Due Date ",
      shipToLabel: "Ship To",
      notesLabel: "Notes",
      subtotalLabel: "Sub Total",
      dicountLabel: "Dicount",
      isNextChild: true,
      shippingLabel: "Shipping",
      taxLabel: "Tax",
      termsLabel: "Terms",
      totalLabel: "Total",
      amountpaidLabel: "Amount Paid",
      balanceDueLabel: "Balance Due",
      invoiceChild: [],
    }
  }
  affixControl() {
    return {
      affixType: 'affix-top',
      isNextChild: false,
      margin: 10,
      target: false,
    }
  }
  statisticControl() {
    return {
      prefixIcon: "like",
      isNextChild: false,
      suffixIcon: "like",
      iconType: "outline",
      iconSize: 15,
      statisticArray: [
        {
          title: "Active Users",
          value: 1949101,
        },
        {
          title: "Account Balance (CNY)",
          value: 2019.111,
        },
      ],
    }
  }
  backTopControl() {
    return {
      isNextChild: false,
      description: "Scroll down to see the bottom-right",
      visibleafter: '',
      target: false,
      duration: '',
    }
  }
  anchorControl() {
    return {
      isNextChild: false,
      affix: true,
      offSetTop: 5,
      showInkInFixed: true,
      bond: 5,
      target: false,
      options: [
        {
          nzTitle: "Basic demo",
          nzHref: "#components-anchor-demo-basic",
          children: [],
        },
        {
          nzTitle: "Static demo",
          nzHref: "#components-anchor-demo-static",
          children: [],
        },
        {
          nzHref: "#api",
          nzTitle: "API",
          children: [
            {
              nzHref: "#nz-anchor",
              nzTitle: "nz-anchor",
            },
            {
              nzHref: "#nz-link",
              nzTitle: "nz-link",
            },
          ]
        },
      ],
    }
  }
  modalControl() {
    return {
      btnLabel: "Show Modal",
      modalContent: "Content",
      modalTitle: "The is modal title",
      cancalButtontext: 'Cancel',
      centered: false,
      isNextChild: false,
      okBtnLoading: false,
      cancelBtnLoading: false,
      okBtnDisabled: false,
      cancelDisabled: false,
      ecsModalCancel: true,
      okBtnText: 'Ok',
      closeIcon: 'close',
      width: 250,
      showCloseIcon: true,
      zIndex: 1000,
    }
  }
  popConfirmControl() {
    return {
      btnLabel: "Open Popconfirm with Promise",
      isNextChild: false,
      arrowPointAtCenter: false,
      content: 'Pop Confirm',
      trigger: 'hover',
      placement: 'top',
      visible: false,
      mouseEnterDelay: 0,
      mouseLeaveDelay: 0,
    }
  }
  avatarControl() {
    return {
      icon: "",
      text: "",
      src: "//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      bgColor: "#87d068",
      color: "#f56a00",
      alt: "",
      isNextChild: false,
      gap: 0,
      size: 'default',
      shape: 'circle',
    }
  }
  badgeControl() {
    return {
      count: 10,
      nzText: "",
      nzColor: "",
      isNextChild: false,
      nzStatus: "success",
      status: false,
      standAlone: false,
      dot: true,
      showDot: true,
      overflowCount: '',
      showZero: false,
      nztype: 'count',
      size: '',
      icon: 'clock-circle',
      offset: '',
    }
  }
  commentControl() {
    return {
      avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      isNextChild: false,
      author: 'Han Solo',
    }
  }
  popOverControl() {
    return {
      btnLabel: "Hover me",
      content: "Content",
      arrowPointAtCenter: false,
      trigger: 'hover',
      placement: 'top',
      visible: false,
      isNextChild: false,
      mouseEnterDelay: 0,
      mouseLeaveDelay: 0,
      backdrop: false,
    }
  }
  descriptionControl() {
    return {
      isNextChild: true,
      btnText: "Edit",
      size: "default",
      isBordered: true,
      formatter: "horizontal",
      isColon: false,
    }
  }
  descriptionChildControl() {
    return {
      isNextChild: false,
      nzSpan: 2,
      content: "content",
      nzStatus: "processing",
      isBadeg: true,
    }
  }
  segmentedControl() {
    return {
      isNextChild: false,
      options: [
        { label: 'Daily' },
        { label: 'Weekly' },
        { label: 'Monthly' },
        { label: 'Quarterly' },
        { label: 'Yearly' },
      ],
      block: true,
      disabled: false,
      size: 'default',
      defaultSelectedIndex: 1,
    }
  }
  resultControl() {
    return {
      isNextChild: false,
      status: "success",
      resultTitle: "Successfully Purchased Cloud Server ECS!",
      subTitle: "Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.",
      btnLabel: "Done",
    }
  }
  nzTagControl() {
    return {
      color: "red",
      mode: "closeable",
      isNextChild: false,
      checked: false,
      options: [
        {
          title: 'Twitter',
          icon: 'twitter',
          tagColor: 'blue',
        },
        {
          title: 'Youtube',
          icon: 'youtube',
          tagColor: 'red',
        },
        {
          title: 'Facebook',
          icon: 'facebook',
          tagColor: 'blue',
        },
        {
          title: 'LinkedIn',
          icon: 'linkedin',
          tagColor: 'blue',
        }
      ],
    }
  }
  spinControl() {
    return {
      delayTime: 1000,
      loaderText: "Loading...",
      isNextChild: false,
      simple: false,
      spinning: true,
    }
  }
  transferControl() {
    return {
      disabled: false,
      showSearch: true,
      firstBoxTitle: 'Source',
      secondBoxTitle: 'Target',
      leftButtonLabel: 'to left',
      rightButtonLabel: 'to right',
      isNextChild: false,
      searchPlaceHolder: 'Search here...',
      status: 'default',
      notFoundContentLabel: 'The list is empty',
      list: [
        {
          key: '1',
          title: 'content 1',
          direction: 'right',
        },
        {
          key: '2',
          title: 'content 2',
          direction: undefined,
        },
        {
          key: '3',
          title: 'content 3',
          description: 'description',
          direction: 'right',
        },
        {
          key: '4',
          title: 'content 4',
          direction: undefined,
        },
        {
          key: '5',
          title: 'content 5',
          direction: 'right',
        },
        {
          key: '6',
          title: 'content 6',
          direction: undefined,
        },
        {
          key: '7',
          title: 'content 7',
          direction: 'right',
        },
        {
          key: '8',
          title: 'content 8',
          direction: 'undefined',
        },
        {
          key: '9',
          title: 'content 9',
          direction: 'right',
        },
        {
          key: '10',
          title: 'content 10',
          direction: undefined,
        },
      ],
    }
  }
  treeSelectControl() {
    return {
      expandKeys: ['100', '1001'],
      showSearch: false,
      placeHolder: '',
      disabled: false,
      icon: false,
      isNextChild: false,
      width: true,
      hideUnMatched: false,
      status: 'default',
      checkable: false,
      showExpand: true,
      showLine: false,
      defaultExpandAll: false,
      size: 'default',
      key: '100',
      nodes: [
        {
          title: 'parent 1',
          key: '100',
          children: [
            {
              title: 'parent 1-0',
              key: '1001',
              children: [
                { title: 'leaf 1-0-0', key: '10010', isLeaf: true },
                { title: 'leaf 1-0-1', key: '10011', isLeaf: true }
              ]
            },
            {
              title: 'parent 1-1',
              key: '1002',
              children: [{ title: 'leaf 1-1-0', key: '10020', isLeaf: true }]
            }
          ]
        }
      ],
    }
  }
  treeControl() {
    return {
      checkable: false,
      blockNode: false,
      showLine: false,
      showIcon: false,
      draggable: false,
      multiple: false,
      isNextChild: false,
      expandAll: false,
      expand: true,
      expandIcon: 'folder',
      closingexpandicon: 'file',
      nodes: [
        {
          title: '0-0',
          key: '0-0',
          expanded: true,
          children: [
            {
              title: '0-0-0',
              key: '0-0-0',
              children: [
                { title: '0-0-0-0', key: '0-0-0-0', isLeaf: true },
                { title: '0-0-0-1', key: '0-0-0-1', isLeaf: true },
                { title: '0-0-0-2', key: '0-0-0-2', isLeaf: true }
              ]
            },
            {
              title: '0-0-1',
              key: '0-0-1',
              children: [
                { title: '0-0-1-0', key: '0-0-1-0', isLeaf: true },
                { title: '0-0-1-1', key: '0-0-1-1', isLeaf: true },
                { title: '0-0-1-2', key: '0-0-1-2', isLeaf: true }
              ]
            },
            {
              title: '0-0-2',
              key: '0-0-2',
              isLeaf: true
            }
          ]
        },
        {
          title: '0-1',
          key: '0-1',
          children: [
            { title: '0-1-0-0', key: '0-1-0-0', isLeaf: true },
            { title: '0-1-0-1', key: '0-1-0-1', isLeaf: true },
            { title: '0-1-0-2', key: '0-1-0-2', isLeaf: true }
          ]
        },
        {
          title: '0-2',
          key: '0-2',
          isLeaf: true
        }
      ],
    }
  }
  cascaderControl() {
    return {
      isNextChild: false,
      expandTrigger: 'hover',
      placeHolder: 'Please select',
      size: 'default',
      status: 'default',
      expandIcon: 'down',
      showInput: true,
      disabled: false,
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                  isLeaf: true
                }
              ]
            },
            {
              value: 'ningbo',
              label: 'Ningbo',
              isLeaf: true
            }
          ]
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                  isLeaf: true
                }
              ]
            }
          ]
        }
      ],
    }
  }
  drawerControl() {
    return {
      isNextChild: false,
      color: "bg-blue-500",
      btnText: "Open Drawer",
      isClosable: true,
      icon: "close",
      extra: "extra",
      isKeyboard: true,
      footerText: "",
      isVisible: false,
      placement: "right",
      size: "default",
      width: 500,
      height: 500,
      offsetX: 0,
      offsetY: 0,
      wrapClassName: "",
      zIndex: 1,
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum blanditiis sunt unde quisquam architecto. Nesciunt eum consequatur suscipit obcaecati. Aliquam repudiandae neque ratione natus doloribus ab excepturi, a modi voluptate!',
    }
  }
  skeletonControl() {
    return {
      isActive: false, //true
      size: "default", //large, small
      isNextChild: false,
      buttonShape: "circle", //default ,round
      avatarShape: "circle", //square
      shapeType: "paragraph",
    }
  }
  emptyControl() {
    return {
      isNextChild: false,
      icon: "https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg",
      content: "contentTpl",
      text: "Description",
      link: "#API",
      btnText: "Create Now",
      color: "bg-blue-600",
    }
  }
  listControl() {
    return {
      isNextChild: false,
      headerText: "this is Header",
      footerText: "this is footer",
      formatter: "vertical",
      size: "default",
      isBordered: true,
      isSplit: false,
      isEdit: true,
      isUpdate: false,
      isDelete: true,
      isLoad: false,
      loadText: "Loading more",
      options: [
        {
          avater: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          name: "Mr Felicíssimo Porto",
          lastNameHref: "https://ng.ant.design",
          description: "Ant Design, a design language for background applications, is refined by Ant UED Team",
          email: "felicissimo.porto@example.com",
          gender: "male",
          content: "Content",
          nat: "BR",
          isLoading: false,
        },
        {
          avater: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          name: "Miss Léane Muller",
          lastNameHref: "https://ng.ant.design",
          description: "Ant Design, a design language for background applications, is refined by Ant UED Team",
          email: "leane.muller@example.com",
          gender: "female",
          content: "Content",
          nat: "FR",
          loading: false,
        },
        {
          avater: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          name: "Mrs کیمیا موسوی",
          lastNameHref: "https://ng.ant.design",
          description: "Ant Design, a design language for background applications, is refined by Ant UED Team",
          email: "khymy.mwswy@example.com",
          gender: "female",
          content: "Content",
          nat: "IR",
          loading: false,
        },
        {
          avater: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          name: "Mr Antonin Fabre",
          lastNameHref: "https://ng.ant.design",
          description: "Ant Design, a design language for background applications, is refined by Ant UED Team",
          email: "antonin.fabre@example.com",
          gender: "male",
          content: "Content",
          nat: "FR",
          loading: true,
        },
        {
          avater: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          name: "Mr Jivan Ronner",
          lastNameHref: "https://ng.ant.design",
          description: "Ant Design, a design language for background applications, is refined by Ant UED Team",
          email: "jivan.ronner@example.com",
          gender: "male",
          content: "Content",
          nat: "NL",
          loading: false,
        }
      ],
    }
  }
  treeViewControl() {
    return {
      isNextChild: false,
      isBlockNode: true,
      isDraggable: true,
      isShowLine: true,
      isCheckable: false,
      isMultiple: false,
      isExpandAll: false,
      nodes: [
        {
          title: 'parent 1',
          key: '100',
          expanded: true,
          children: [
            {
              title: 'parent 1-0',
              key: '1001',
              expanded: true,
              children: [
                { title: 'leaf', key: '10010', isLeaf: true },
                { title: 'leaf', key: '10011', isLeaf: true },
                { title: 'leaf', key: '10012', isLeaf: true }
              ]
            },
            {
              title: 'parent 1-1',
              key: '1002',
              children: [{ title: 'leaf', key: '10020', isLeaf: true }]
            },
            {
              title: 'parent 1-2',
              key: '1003',
              children: [
                { title: 'leaf', key: '10030', isLeaf: true },
                { title: 'leaf', key: '10031', isLeaf: true }
              ]
            }
          ]
        }
      ],
    }
  }
  mentionsControl() {
    return {
      isNextChild: false,
      options: [
        {
          label: 'afc163'
        },
        {
          label: 'benjycui'
        },
        {
          label: 'yiminghe'
        },
        {
          label: 'RaoHai'
        },
        {
          label: '中文'
        },
      ],
      placeholder: "enter sugestion",
      rows: "1",
      loading: false,
      disabled: false,
      noneData: '',
      status: 'default',
      prefix: '',
      position: 'top',
    }
  }
  messageControl() {
    return {
      isNextChild: false,
      content: "this message is disappeard after 10 seconds",
      duration: 10000,
      messageType: "success",
      pauseOnHover: true,
      animate: true,
    }
  }
  notificationControl() {
    return {
      content: "A function will be be called after the notification is closed (automatically after the 'duration' time of manually).",
      isSmile: true,
      icon: "smile",
      color: "#108ee9",
      duration: 3000,
      pauseOnHover: true,
      isNextChild: false,
      animate: true,
      notificationType: 'default',
      placement: 'topRight',
    }
  }
  iconControl() {
    return {
      isNextChild: false,
      icon: 'star',
      iconType: 'outline',
      iconSize: 15,
    }
  }
}