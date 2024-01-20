import { Injectable } from "@angular/core";
import { Guid } from "src/app/models/guid";

@Injectable({
  providedIn: 'root'
})
export class AddControlService {

  getPageControl() {
    return {
      tooltipIcon: 'question-circle',
      footer: false, header: false,
      options: [
        {
          VariableName: ''
        }
      ],
      isNextChild: true,
    }
  }
  headerLogoControl() {
    return {
      tooltipIcon: 'question-circle',
      isNextChild: false,
    }
  }
  getPageHeaderControl() {
    return {
      headingSize: "text-xl",
      backGroundColor: "#ffffff",
      textColor: "#000000",
      footer: false,
      header: true,
      isBordered: true,
      labelPosition: 'text-left',
      alertPosition: 'topHeader',
      textClass: '',
      isNextChild: true,
    }
  }
  getFileManagerControl() {
    return {
      apiUrl: '',
      isNextChild: false,
      showFile: true,
      showFolder: true,
      isAllowCreateFolder: true,
      isAllowCreateFile: true,
      isShowBreadcrumb: true,
      isAllowDeleteFolder: true,
      isAllowDeleteFiles: true,
      download: true,
      isAllowShared: true,
      isAllowStarred: true,
      isAllowTrash: true,
      showFolderDetail: true,
    }
  }
  getChatControl() {
    return {
      isNextChild: false,
      chatData:[]
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
  getEmailControl() {
    return {
      isNextChild: false,
    }
  }
  getTaskManagerControl() {
    return {
      isNextChild: true,
      tableHeaders:[]
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
      borderLessInputs: false,
      isBordered: true,
      size: 'default',
      status: '',
      wrapper: '',
      formatAlignment: '',
      borderRadius: '0px 0px 0px 0px',
      mapApi: '',
      tooltipIcon: 'question-circle',
      tableHeader: [
        { name: 'fileHeader', },
        { name: 'SelectQBOField' },
        { name: 'defaultValue' },
      ],
      tableBody: [],
      checkDatas: '',
      dbData: '',
      tableData: [],
      rowClass: 'flex flex-wrap'
    }
  }
  getHeaderControl() {
    return {
      footer: false,
      headingSize: "",
      headerCollapse: false,
      header: true,
      labelPosition: "text-left",
      isNextChild: true,
      backGroundColor: "#FFFFFF",
      textColor: "#000000",
      expandedIconPosition: 'left'
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
  getTaskManagerCommentControl() {
    return {
      isNextChild: true,
    }
  }
  getHeader1(newNode?: any, moduleId?: any) {
    return {
      children: [
        { ...newNode, title: 'heading', type: 'heading', key: 'heading', id: moduleId + "_" + 'heading' + "_" + Guid.newGuid(), ...this.headingControl() },
        { ...newNode, title: 'paragraph', type: 'paragraph', key: 'paragraph', id: moduleId + "_" + 'paragraph' + "_" + Guid.newGuid(), ...this.paragraphControl() },
        { ...newNode, title: 'insertButton', key: 'insertButton', id: moduleId + "_" + 'insertButton' + "_" + Guid.newGuid(), ...this.getInsertButtonControl() }
      ]
    }
  }
  getHeader_2(newNode?: any, moduleId?: any) {
    return {
      children: [
        { ...newNode, title: 'heading', type: 'heading', key: 'heading', id: moduleId + "_" + 'heading' + "_" + Guid.newGuid(), ...this.headingControl() },
        { ...newNode, title: 'paragraph', type: 'paragraph', key: 'paragraph', id: moduleId + "_" + 'paragraph' + "_" + Guid.newGuid(), ...this.paragraphControl() },
        { ...newNode, title: 'insertButton', key: 'insertButton', id: moduleId + "_" + 'insertButton' + "_" + Guid.newGuid(), ...this.getInsertButtonControl() }
      ]
    }
  }
  getHeade_3(newNode?: any, moduleId?: any) {
    return {
      children: [
        { ...newNode, title: 'heading', type: 'heading', key: 'heading', id: moduleId + "_" + 'heading' + "_" + Guid.newGuid(), ...this.headingControl() },
        { ...newNode, title: 'paragraph', type: 'paragraph', key: 'paragraph', id: moduleId + "_" + 'paragraph' + "_" + Guid.newGuid(), ...this.paragraphControl() },
        { ...newNode, title: 'insertButton', key: 'insertButton', id: moduleId + "_" + 'insertButton' + "_" + Guid.newGuid(), ...this.getInsertButtonControl() }
      ]
    }
  }
  getHeader_4(newNode?: any, moduleId?: any) {
    return {
      children: [
        { ...newNode, title: 'heading', type: 'heading', key: 'heading', id: moduleId + "_" + 'heading' + "_" + Guid.newGuid(), ...this.headingControl() },
        { ...newNode, title: 'paragraph', type: 'paragraph', key: 'paragraph', id: moduleId + "_" + 'paragraph' + "_" + Guid.newGuid(), ...this.paragraphControl() },
        { ...newNode, title: 'insertButton', key: 'insertButton', id: moduleId + "_" + 'insertButton' + "_" + Guid.newGuid(), ...this.getInsertButtonControl() }
      ]
    }
  }
  getHeader_5(newNode?: any, moduleId?: any) {
    return {
      children: [
        { ...newNode, title: 'heading', type: 'heading', key: 'heading', id: moduleId + "_" + 'heading' + "_" + Guid.newGuid(), ...this.headingControl() },
        { ...newNode, title: 'paragraph', type: 'paragraph', key: 'paragraph', id: moduleId + "_" + 'paragraph' + "_" + Guid.newGuid(), ...this.paragraphControl() },
        { ...newNode, title: 'insertButton', key: 'insertButton', id: moduleId + "_" + 'insertButton' + "_" + Guid.newGuid(), ...this.getInsertButtonControl() }
      ]
    }
  }
  getHeader_6(newNode?: any, moduleId?: any) {
    return {
      children: [
        { ...newNode, title: 'heading', type: 'heading', key: 'heading', id: moduleId + "_" + 'heading' + "_" + Guid.newGuid(), ...this.headingControl() },
        { ...newNode, title: 'paragraph', type: 'paragraph', key: 'paragraph', id: moduleId + "_" + 'paragraph' + "_" + Guid.newGuid(), ...this.paragraphControl() },
        { ...newNode, title: 'insertButton', key: 'insertButton', id: moduleId + "_" + 'insertButton' + "_" + Guid.newGuid(), ...this.getInsertButtonControl() }
      ]
    }
  }
  getHeader_7(newNode?: any, moduleId?: any) {
    return {
      children: [
        { ...newNode, title: 'heading', type: 'heading', key: 'heading', id: moduleId + "_" + 'heading' + "_" + Guid.newGuid(), ...this.headingControl() },
        { ...newNode, title: 'paragraph', type: 'paragraph', key: 'paragraph', id: moduleId + "_" + 'paragraph' + "_" + Guid.newGuid(), ...this.paragraphControl() },
        { ...newNode, title: 'insertButton', key: 'insertButton', id: moduleId + "_" + 'insertButton' + "_" + Guid.newGuid(), ...this.getInsertButtonControl() }
      ]
    }
  }
  getwebisteHeader(newNode?: any, moduleId?: any) {
    return {
      children: [
        { ...newNode, title: 'heading', type: 'heading', key: 'heading', id: moduleId + "_" + 'heading' + "_" + Guid.newGuid(), ...this.headingControl() },
        { ...newNode, title: 'paragraph', type: 'paragraph', key: 'paragraph', id: moduleId + "_" + 'paragraph' + "_" + Guid.newGuid(), ...this.paragraphControl() },
        { ...newNode, title: 'insertButton', key: 'insertButton', id: moduleId + "_" + 'insertButton' + "_" + Guid.newGuid(), ...this.getInsertButtonControl() }
      ]
    }
  }
  getwebistepricing(newNode?: any, moduleId?: any) {
    return {
      children: [
        {
          ...newNode, title: 'heading', type: 'heading', key: 'heading', id: moduleId + "_" + 'heading' + "_" + Guid.newGuid(), ...this.headingControl(),
          children: [
            { ...newNode, title: 'heading', type: 'heading', key: 'heading', id: moduleId + "_" + 'heading' + "_" + Guid.newGuid(), ...this.headingControl() },
            { ...newNode, title: 'heading', type: 'heading', key: 'heading', id: moduleId + "_" + 'heading' + "_" + Guid.newGuid(), ...this.headingControl() },
          ]
        },
        {
          ...newNode, title: 'paragraph', type: 'paragraph', key: 'paragraph', id: moduleId + "_" + 'paragraph' + "_" + Guid.newGuid(), ...this.paragraphControl(),
          children: [
            { ...newNode, title: 'icon', type: 'icon', key: 'icon', id: moduleId + "_" + 'icon' + "_" + Guid.newGuid(), ...this.iconControl() },
            { ...newNode, title: 'paragraph', type: 'paragraph', key: 'paragraph', id: moduleId + "_" + 'paragraph' + "_" + Guid.newGuid(), ...this.paragraphControl() },
            { ...newNode, title: 'icon', type: 'icon', key: 'icon', id: moduleId + "_" + 'icon' + "_" + Guid.newGuid(), ...this.iconControl() },
            { ...newNode, title: 'paragraph', type: 'paragraph', key: 'paragraph', id: moduleId + "_" + 'paragraph' + "_" + Guid.newGuid(), ...this.paragraphControl() },
            { ...newNode, title: 'icon', type: 'icon', key: 'icon', id: moduleId + "_" + 'icon' + "_" + Guid.newGuid(), ...this.iconControl() },
            { ...newNode, title: 'paragraph', type: 'paragraph', key: 'paragraph', id: moduleId + "_" + 'paragraph' + "_" + Guid.newGuid(), ...this.paragraphControl() },
            { ...newNode, title: 'icon', type: 'icon', key: 'icon', id: moduleId + "_" + 'icon' + "_" + Guid.newGuid(), ...this.iconControl() },
            { ...newNode, title: 'paragraph', type: 'paragraph', key: 'paragraph', id: moduleId + "_" + 'paragraph' + "_" + Guid.newGuid(), ...this.paragraphControl() },
            { ...newNode, title: 'icon', type: 'icon', key: 'icon', id: moduleId + "_" + 'icon' + "_" + Guid.newGuid(), ...this.iconControl() },
          ],
        },
        { ...newNode, title: 'insertButton', key: 'insertButton', id: moduleId + "_" + 'insertButton' + "_" + Guid.newGuid(), ...this.getInsertButtonControl() }
      ]
    }
  }
  getInsertButtonControl(type?: any, data?: any) {
    return {
      type: type == 'downloadButton' ? 'downloadButton' : "button",
      commonButtonProperty: data?.parameter,
      actionType: "insert",
      isNextChild: false,
      className: "w-auto",
      color: "",
      hoverColor: "",
      btnIcon: "fa-regular fa-floppy-disk",
      rightbtnIcon: "",
      format: "text-left",
      disabled: false,
      nzDanger: false,
      nzBlock: false,
      nztype: "default",
      nzSize: "large",
      nzShape: 'default',
      iconType: 'font_awsome',
      nzLoading: false,
      nzGhost: false,
      iconSize: 15,
      hoverTextColor: '',
      textColor: '',
      // isSubmit: false,
      btnType: "",
      href: "",
      dataTable: "",
      btnLabelPaddingClass: '',
      btnopacity: '',
      badgeType: 'none',
      badgeCount: '',
      hoverBorderColor: '',
      borderColor: '',
      iconPlacement: 'left',
      hoverIconColor: '',
      captureData: 'sectionLevel',
      innerClass: '!rounded !bg-blue-500 !text-white hover:!bg-blue-600 hover:text-white !border !border-transparent !hover:border-transparent font-md text-lg',
      path: '',
      showHideButton: 'hideBoth',
      hideHeader:false,
    }
  }
  getDropdownButtonControl() {
    return {
      isNextChild: false,
      className: "w-auto",
      color: "",
      hoverColor: "",
      btnIcon: "",
      rightbtnIcon: "fa-regular fa-chevron-down",
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
      iconType: 'font_awsome',
      nztype: "default",
      textColor: "",
      hoverIconColor: '',
      buttonClass: '!rounded !bg-blue-500 !text-white hover:!bg-blue-600 hover:text-white !border !border-transparent !hover:border-transparent !font-medium !text-base',
      iconSize: 15,
      hoverTextColor: '',
      dataTable: '',
      btnLabelPaddingClass: '',
      hoverBorderColor: '',
      borderColor: '',
      iconPlacement: 'right',
      dropdownOptions: [
        {
          label: "Option 1",
          link: "",
        },
        {
          label: "Option 2",
          link: "",
        },
        {
          label: "Option 3",
          link: "",
        },
        {
          label: "Option 4",
          link: "",
        },
      ],
      badgeType: 'none',
      badgeCount: '',
    }
  }
  getMenuControl() {
    return {

    }
  }
  getCardWithComponentsControl() {
    return {
      isNextChild: true,
      borderless: false,
      height: 0,
      footerText: 'Footer',
      bgColor: '',
      hoverIconColor: '',

      headerTextColor: '',
      footerTextColor: '',
      mapApi: '',
      tableHeader: [
        { name: 'fileHeader', },
        { name: 'SelectQBOField' },
        { name: 'defaultValue' },
      ],
      tableBody: [],
      checkDatas: '',
      dbData: '',
      tableData: [],
      badgeType: 'none',
      badgeRibbonText: '',
      badgeCount: '',
      dot_ribbon_color: '#E93F3F',
      rowClass: 'flex flex-wrap'
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
      // imagHieght: 200,
      // imageWidth: 200,
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
      nodes: "3",
      // carousalConfig: [
      //   {
      //     img: "assets/images/small/img-1.jpg",
      //   },
      //   {
      //     img: "assets/images/small/img-2.jpg",
      //   },
      //   {
      //     img: "assets/images/small/img-3.jpg",
      //   }
      // ],
    }
  }
  getsubCarouselCrossfadeControl() {
    return {
      isNextChild: true,

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
      // iconType: '',
      description: '',
      iconType: 'outline',
      iconSize: 15,
      iconColor: '',
    }
  }
  getrepeatableControll() {
    return {
      props: {
        addText: 'Add Task',
        label: 'TODO LIST',
      },
      fieldArray: {
        type: 'input',
        props: {
          placeholder: 'Task name',
          required: true,
        },
      },
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
      hoverIconColor: '',

      imageSrc: '',
      imageAlt: '',
      description: 'Description',
      // bgColorHeader:'',
      // bgColorBody:'',
      // bgColorFooter:'',
      bgColor: '',
      footer: false,
      headerTextColor: '',
      footerTextColor: '',
      badgeType: 'none',
      badgeRibbonText: '',
      badgeCount: '',
      dot_ribbon_color: '#E93F3F',
    }
  }
  getTabsControl() {
    return {
      disabled: false,
      isNextChild: true,
      icon: 'star',
      iconType: 'outline',
      iconSize: 15,
      mapApi: '',
      hoverIconColor: '',

      tableHeader: [
        { name: 'fileHeader', },
        { name: 'SelectQBOField' },
        { name: 'defaultValue' },
      ],
      tableBody: [],
      checkDatas: '',
      dbData: '',
      tableData: [],
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
      border: true,
      hoverIconColor: '',

      nodes: "3",
      centerd: false,
      selectTabColor: 'red',
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
      status: 'none',
      hoverIconColor: '',
      styleType: 'steper 1',
      disabled: false,
      border: true,
      nodes: "3",
      selectTabColor: 'red',
    }
  }
  getlistWithComponentsControl() {
    return {
      isNextChild: true,
      nodes: "3",
      mapApi: '',
      hoverIconColor: '',

      tableHeader: [

        { name: 'fileHeader', },
        { name: 'SelectQBOField' },
        { name: 'defaultValue' },
      ],
      tableBody: [],
      checkDatas: '',
      isBordered: true,
      dbData: '',
      tableData: [],
    }
  }
  getlistWithComponentsChildControl() {
    return {
      isNextChild: true,
      mapApi: '',
      tableHeader: [
        { name: 'fileHeader', },
        { name: 'SelectQBOField' },
        { name: 'defaultValue' },
      ],
      tableBody: [],
      checkDatas: '',
      dbData: '',
      tableData: [],
      rowClass: 'flex flex-wrap'
    }
  }
  getStepControl() {
    return {
      icon: 'star',
      className: "w-full",
      disabled: false,
      description: "description",
      hoverIconColor: '',

      isNextChild: true,
      status: '',
      subtitle: '',
      percentage: '',
      iconType: 'outline',
      iconSize: 15,
      mapApi: '',
      tableHeader: [
        { name: 'fileHeader', },
        { name: 'SelectQBOField' },
        { name: 'defaultValue' },
      ],
      tableBody: [],
      checkDatas: '',
      dbData: '',
      tableData: [],
    }
  }
  getKanbanControl() {
    return {
      screenLink: "",
      nodes: 3,
      maxLength: 10,
      showAddbtn: true,
      isNextChild: true,
    }
  }
  getKanbanTaskControl() {
    return {
      isNextChild: true,
      // date: "14 Oct, 2019",
      // content: "In enim justo rhoncus ut",
      // users: [
      //   {
      //     "name": "Emily Surface"
      //   }
      // ],
      // status: "open",
      // variant: "bg-primary",
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
      dataTable: '',
      btnLabelPaddingClass: '',
      hoverIconColor: '',
      badgeType: 'none',
      badgeCount: '',
      hoverBorderColor: '',
      borderColor: '',
      iconPlacement: 'left',
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
  divControl() {
    return {
      isNextChild: true,
      divClass: '',
      imageSrc: '',
      height: 0,
      width: 0,
      rowClass: 'flex flex-wrap'
    }
  }
  mainDivControl() {
    return {
      isNextChild: true,
      divRepeat: 1,
    }
  }
  headingControl() {
    return {
      isNextChild: false,
      style: "font-weight:bold;",
      fontweight: "font-bold",
      textAlign: "text-left",
      color: '',
      headingApi: "",
      text: "Editor.js",
      innerClass: 'text-base',
      fontstyle: '',
      link: '',
    }
  }
  qrControl() {
    return {
      isNextChild: false,
      qrString: "<html>  <body onload='window.print();'> ^XA ^MMT ^PW406 ^LL0203 ^LS0 ^FT90,250^BQN,2,4 ^FH\\^FDLA,$link^FS ^PQ1,0,1,Y ^XZ </body> </html>",
      link: "https://s3.me-south-1.amazonaws.com/campaigns.expocitydubai.com/pdfs/generated_pdf_1700311607606.pdf"
    }
  }
  paragraphControl() {
    return {
      editable: false,
      color: '',
      fontstyle: '',
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
      hoverIconColor: '',
      editableIcon: '',
      link: '',
      iconType: 'outline',
      iconSize: 15,
      iconColor: '',
      innerClass: '!text-sm'
    }
  }
  htmlBlockControl() {
    return {
      data: '',
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
      selectType: 'multiple',
      multiFileUploadTypes: 'dragNDrop'
    }
  }
  gridListControl() {
    return {
      tableId: "gridList_" + Guid.newGuid(),
      nzFooter: "",
      nzTitle: "",
      doubleClick: true,
      nzPaginationPosition: "bottom",
      nzPaginationType: "default",
      nzLoading: false,
      nzFrontPagination: true,
      end: 10,
      nzShowPagination: true,
      serverSidePagination: false,
      nzBordered: true,
      showColumnHeader: true,
      noResult: false,
      nzSimple: false,
      nzSize: 'default',
      position: 'left',
      isNextChild: true,
      nzShowSizeChanger: false,
      api: "",
      showCheckbox: false,
      expandable: true,
      fixHeader: false,
      tableScroll: false,
      fixedColumn: false,
      sort: true,
      filter: true,
      isAddRow: false,
      rowClickApi: "",
      tableKey: [],
      displayData: [],
      showEditInput: false,
      isDeleteAllow: true,
      searchfieldClass: '!rounded-tr-md !rounded-br-md !w-10 !flex !justify-center !items-center !h-[35px] !bg-blue-600 hover:!bg-blue-500 !text-white !border !border-transparent hover:!border-transparent',
      isAllowGrouping: false,
      showTotal: true,
      outerBordered: false,
      rowSelected: false,
      stickyHeaders: false,
      isAllowSearch: false,
      isAllowUploadExcel: false,
      isAllowExcelReport: false,
      drawerButtonLabel: 'Open Drawer',
      actionButtonClass: 'actions-btn btn-no !border-none !bg-blue-600 hover:!bg-blue-500 my-2 !h-[35px]',
      tdrowClass: 'overflow-hidden whitespace-nowrap text-ellipsis font-normal text-[#23303d] border border-t-0 border-l border-r border-[#e5e7eb] border-solid text-xs z-0 bg-white border-x p-[5px]',
      dataRow: 'group w-full bg-white hover:bg-white',
      editCell: '!text-center group-hover:!bg-white',
      deleteCell: '!text-center !bg-white group-hover:!bg-white',
      tableHeaders: [],
      tableData: [],
    }
  }
  invoiceGridControl() {
    return {
      tableId: "gridList_" + Guid.newGuid(),
      nzFooter: "This is footer",
      nzTitle: "This is Title",
      nzPaginationPosition: "bottom",
      nzPaginationType: "default",
      nzLoading: false,
      nzFrontPagination: true,
      end: 10,
      nzShowPagination: true,
      nzBordered: false,
      showColumnHeader: true,
      noResult: false,
      nzSimple: false,
      nzSize: 'default',
      isNextChild: false,
      nzShowSizeChanger: false,
      api: "",
      showCheckbox: true,
      // expandable: true,
      fixHeader: false,
      tableScroll: false,
      fixedColumn: false,
      sort: true,
      filter: true,
      isAddRow: true,
      rowClickApi: "",
      tableKey: [],
      tableHeaders: [
        {
          name: 'Id',
          key: 'Id',
          sortOrder: null,
          columnClickApi: "",
          sortFn: (a: any, b: any) => a.name.localeCompare(b.name),
          sortDirections: ['ascend', 'descend', null],
          filterMultiple: true,
          show: true,
          dataType: "input",
          sum: false,
        },
        {
          name: 'Item',
          key: 'Item',
          sortOrder: null,
          columnClickApi: "",
          sortFn: (a: any, b: any) => a.description.localeCompare(b.description),
          sortDirections: ['ascend', 'descend', null],
          filterMultiple: true,
          show: true,
          dataType: "input",
          sum: false,
        },
        {
          name: 'Quantity',
          key: 'Quantity',
          sortOrder: null,
          columnClickApi: "",
          sortFn: (a: any, b: any) => a.quantity.localeCompare(b.quantity),
          sortDirections: ['ascend', 'descend', null],
          filterMultiple: true,
          show: true,
          dataType: "input",
          sum: false,
        },
        {
          name: 'Price',
          key: 'Price',
          sortOrder: null,
          columnClickApi: "",
          sortFn: (a: any, b: any) => a.price.localeCompare(b.price),
          sortDirections: ['ascend', 'descend', null],
          filterMultiple: true,
          show: true,
          dataType: "input",
          sum: false,
        },
        // {
        //   name: 'Amount',
        //   key: 'Amount',
        //   sortOrder: null,
        //   columnClickApi: "",
        //   sortFn: (a: any, b: any) => a.amount.localeCompare(b.amount),
        //   sortDirections: ['ascend', 'descend', null],
        //   filterMultiple: true,
        //   show: true,
        //   dataType: "input",
        //   sum: false,
        // },
      ],
      tableData: [
        {
          id: 1,
          Item: 'Book',
          quantity: 5,
          price: 100,
          // amount: "quantity * price",
        },
        {
          id: 2,
          Item: 'Pencil',
          quantity: 10,
          price: 10,
          // amount: "quantity * price",
        },
        {
          id: 3,
          Item: 'Ink',
          quantity: 3,
          price: 20,
          // amount: "quantity * price",
        },
        {
          id: 4,
          Item: 'Water bottle',
          quantity: 1,
          price: 250,
          amount: "quantity * price",
        },
      ],
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
      pendingText: "",
      mainIcon: "loading",
      reverse: false,
      labelText: '',
      isNextChild: true,
      mode: 'left',
      iconType: 'outline',
      iconSize: 15,
      hoverIconColor: '',
      nodes: 3,
      iconColor: '',
      // data: [
      //   {
      //     title: "Timeline Event One",
      //     dotIcon: 'loading',
      //     color: 'green',
      //     date: '11-Apr-2023',
      //     timeLineDescription: 'description',
      //   },
      //   {
      //     title: "Timeline Event two",
      //     dotIcon: 'down',
      //     timecolor: 'green',
      //     date: '11-Apr-2023',
      //     timeLineDescription: 'description',
      //   },
      //   {
      //     title: "Timeline Event three",
      //     dotIcon: 'loading',
      //     timecolor: 'green',
      //     date: '11-Apr-2023',
      //     timeLineDescription: 'description',
      //   },
      //   {
      //     title: "Timeline Event One",
      //     dotIcon: 'loading',
      //     timecolor: 'green',
      //     date: '11-Apr-2023',
      //     timeLineDescription: 'description',
      //   },
      //   {
      //     title: "Timeline Event One",
      //     dotIcon: 'loading',
      //     timecolor: 'green',
      //     date: '11-Apr-2023',
      //     timeLineDescription: 'description',
      //   },
      //   {
      //     title: "Timeline Event One",
      //     dotIcon: 'loading',
      //     timecolor: 'green',
      //     date: '11-Apr-2023',
      //     timeLineDescription: 'description',
      //   },
      //   {
      //     title: "Timeline Event One",
      //     dotIcon: 'loading',
      //     timecolor: 'green',
      //     date: '11-Apr-2023',
      //     timeLineDescription: 'description',
      //   },
      // ],
    }
  }
  timelineChildControl() {
    return {
      isNextChild: true,
      tableHeader: [
        { name: 'fileHeader', },
        { name: 'SelectQBOField' },
        { name: 'defaultValue' },
      ],
      tableBody: [],
      checkDatas: '',
      dbData: '',
      tableData: [],
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
      hoverIconColor: '',
      nzShowArrow: true,
      extra: '',
      style:{
        '--background': '#fafafa',
      }
    }
  }
  contactListControl() {
    return {
      nzBordered: true,
      nzGhost: false,
      nzExpandIconPosition: "left",
      nzDisabled: false,
      isNextChild: true,
      nzExpandedIcon: '',
      hoverIconColor: '',

      nzShowArrow: true,
      extra: '',
    }
  }
  dividerControl() {
    return {
      dividerClassName: "w-1/4",
      dividerText: "Divider",
      icon: "plus",
      iconType: 'outline',
      iconSize: 15,
      height: 0,
      hoverIconColor: '',

      iconColor: '',
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
      hoverIconColor: '',

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
      hoverIconColor: '',
      ngvalue: 0,
      disabled: false,
      iconType: 'outline',
      iconSize: 15,
      iconColor: '',
      options: ['terrible', 'bad', 'normal', 'good', 'wonderful'],
    }
  }
  rangeSliderControl() {
    return {
      min: 0,
      isNextChild: false,
      max: 100,
      disabled: false,
      showValue: false,
      reverse: false,
      format: false,
      iconType: 'outline',
      iconSize: 15,
      hoverIconColor: '',

      icon: 'star',
      height: 0,
    }
  }
  invoiceControl() {
    return {
      // invoiceNumberLabel: "Invoice Number",
      poNumber: "PO Number",
      datelabel: "Date Label",
      paymentTermsLabel: "Payment Terms",
      billToLabel: "Bill To ",
      dueDateLabel: "Due Date ",
      shipToLabel: "Ship To",
      notesLabel: "Notes",
      subtotalLabel: "Sub Total",
      dicountLabel: "Dicount",
      shippingLabel: "Shipping",
      taxLabel: "Tax",
      termsLabel: "Terms",
      totalLabel: "Total",
      amountpaidLabel: "Amount Paid",
      balanceDueLabel: "Balance Due",
      isNextChild: true,
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
      hoverIconColor: '',

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
      btnClass:"!rounded !bg-blue-500 !text-white hover:!bg-blue-600 hover:text-white !border !border-transparent !hover:border-transparent !font-normal !text-base",
      centered: false,
      isNextChild: true,
      okBtnLoading: false,
      cancelBtnLoading: false,
      okBtnDisabled: false,
      cancelDisabled: false,
      ecsModalCancel: true,
      okBtnText: 'Ok',
      closeIcon: 'close',
      width: 250,
      hoverIconColor: '',
      showCloseIcon: true,
      zIndex: 1000,
      iconType: 'outline',
      iconSize: 15,
      iconColor: '',
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
      hoverIconColor: '',

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
      hoverIconColor: '',

      overflowCount: '',
      showZero: false,
      nztype: 'count',
      size: '',
      icon: 'clock-circle',
      offset: '',
      iconType: 'outline',
      iconSize: 15,
      iconColor: '',
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
      hoverIconColor: '',

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
      // iconType: 'outline',
      // iconSize: 15,
      // iconColor: '',
    }
  }
  nzTagControl() {
    return {
      color: "red",
      mode: "closeable",
      isNextChild: false,
      checked: false,
      hoverIconColor: '',

      iconType: 'outline',
      iconSize: 15,
      iconColor: '',
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
      hoverIconColor: '',

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
      hoverIconColor: '',

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
      hoverIconColor: '',

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
      hoverIconColor: '',

      expandAll: false,
      expand: true,
      expandIcon: 'folder',
      closingexpandicon: 'file',
      iconType: 'outline',
      iconSize: 15,
      iconColor: '',
      nodes: [
        {
          title: '0-0',
          key: '0-0',
          expanded: true,
          "expand": false,
          "expandable": true,
          children: [
            {
              title: '0-0-0',
              key: '0-0-0',
              "expand": false,
              "expandable": true,
              children: [
                { title: '0-0-0-0', key: '0-0-0-0', isLeaf: true },
                { title: '0-0-0-1', key: '0-0-0-1', isLeaf: true },
                { title: '0-0-0-2', key: '0-0-0-2', isLeaf: true }
              ]
            },
            {
              title: '0-0-1',
              key: '0-0-1',
              "expand": false,
              "expandable": true,
              children: [
                { title: '0-0-1-0', key: '0-0-1-0', isLeaf: true },
                { title: '0-0-1-1', key: '0-0-1-1', isLeaf: true },
                { title: '0-0-1-2', key: '0-0-1-2', isLeaf: true }
              ]
            },
            {
              title: '0-0-2',
              key: '0-0-2',
              "expand": false,
              "expandable": true,
              isLeaf: true
            }
          ]
        },
        {
          title: '0-1',
          key: '0-1',
          "expand": false,
          "expandable": true,
          children: [
            { title: '0-1-0-0', key: '0-1-0-0', isLeaf: true },
            { title: '0-1-0-1', key: '0-1-0-1', isLeaf: true },
            { title: '0-1-0-2', key: '0-1-0-2', isLeaf: true }
          ]
        },
        {
          title: '0-2',
          key: '0-2',
          "expand": false,
          "expandable": true,
          // isLeaf: true
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
      hoverIconColor: '',

      showInput: true,
      disabled: false,
      iconType: 'outline',
      iconSize: 15,
      iconColor: '',
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang'
        },
      ],
    }
  }
  drawerControl() {
    return {
      isNextChild: true,
      color: "bg-blue-500",
      btnText: "Open Drawer",
      isClosable: true,
      icon: "close",
      extra: "extra",
      notvisible: true,
      isKeyboard: true,
      footerText: "",
      isVisible: false,
      placement: "right",
      size: "default",
      hoverIconColor: '',
      width: 500,
      height: 500,
      offsetX: 0,
      offsetY: 0,
      wrapClassName: "",
      zIndex: 1,
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum blanditiis sunt unde quisquam architecto. Nesciunt eum consequatur suscipit obcaecati. Aliquam repudiandae neque ratione natus doloribus ab excepturi, a modi voluptate!',
      iconType: 'outline',
      iconSize: 15,
      iconColor: '',
      closeIconPlacement: 'left',
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
      hoverIconColor: '',

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
      hoverIconColor: '',

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
      hoverIconColor: '',

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
      hoverIconColor: '',

      pauseOnHover: true,
      isNextChild: false,
      animate: true,
      notificationType: 'default',
      placement: 'topRight',
      iconType: 'outline',
      iconSize: 15,
      iconColor: '',
      btnText: 'Notification',
      buttonPlacement: 'text-left'
    }
  }
  iconControl() {
    return {
      isNextChild: false,
      icon: 'star',
      iconType: 'outline',
      hoverIconColor: '',
      iconSize: 15,
      badgeType: 'none',

      badgeCount: '',
      dot_ribbon_color: '#E93F3F',
    }
  }
  barChartControl() {
    return {
      isNextChild: false,
      tableData: [
        { name: 'New York City, NY', value: 8175000, value2: 8008000, style: 'stroke-color: #703593; stroke-width: 4; fill-color: #C5A5CF', annotation: '' },
        { name: 'Los Angeles, CA', value: 3792000, value2: 3694000, style: 'stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2', annotation: '' },
        { name: 'Chicago, IL', value: 2695000, value2: 2896000, style: 'opacity: 0.2', annotation: '' },
        { name: 'Houston, TX', value: 2099000, value2: 1953000, style: 'color: #76A7FA', annotation: '' },
        { name: 'Philadelphia, PA', value: 1526000, value2: 1517000, style: 'color: gray', annotation: '' }
      ],
      columnNames: ['City', '2010 Population', '2000 Population'],
      options: {
        chart: {
          title: 'Population of the largest US cities',
          subtitle: 'US Cities',
        },
        hAxis: {
          title: 'Total Population',
          minValue: 0
        },
        vAxis: {
          title: 'City'
        },
        colors: ['#1b9e77', '#d95f02'],
        bar: { groupWidth: "95%" },
        bars: 'horizontal',
        isStacked: false,
      },
      width: 550,
      height: 400,
    }
  }
  pieChartControl() {
    return {
      isNextChild: false,
      tableData: [
        { name: 'Assamese', value: 13 }, { name: 'Bengali', value: 83 }, { name: 'Bodo', value: 1.4 },
        { name: 'Dogri', value: 2.3 }, { name: 'Gujarati', value: 46 }, { name: 'Hindi', value: 300 },
        { name: 'Kannada', value: 38 }, { name: 'Kashmiri', value: 5.5 }, { name: 'Konkani', value: 5 },
        { name: 'Maithili', value: 20 }, { name: 'Malayalam', value: 33 }, { name: 'Manipuri', value: 1.5 },
        { name: 'Marathi', value: 72 }, { name: 'Nepali', value: 2.9 }, { name: 'Oriya', value: 33 },
        { name: 'Punjabi', value: 29 }, { name: 'Sanskrit', value: 0.01 }, { name: 'Santhali', value: 6.5 },
        { name: 'Sindhi', value: 2.5 }, { name: 'Tamil', value: 61 }, { name: 'Telugu', value: 74 }, { name: 'Urdu', value: 52 }
      ],
      options: {
        title: 'My Daily Activities',
        is3D: false,
        pieHole: 0,
        // pieSliceTextStyle: {
        //   color: 'black',
        // },
        // pieSliceText: 'label',
        pieStartAngle: 0,
        // slices: {
        //   4: { offset: 0.2 },
        //   12: { offset: 0.3 },
        //   14: { offset: 0.4 },
        //   15: { offset: 0.5 },
        // },
        sliceVisibilityThreshold: 0
      },
      width: 550,
      height: 400,
    }
  }
  bubbleChartControl() {
    return {
      isNextChild: false,
      columnNames: ['ID', 'X', 'Y', 'Temperature'],
      tableData: [
        { id: 'A', x: 80, y: 167, temprature: 120 },
        { id: 'B', x: 79, y: 136, temprature: 130 },
        { id: 'C', x: 78, y: 184, temprature: 50 },
        { id: 'D', x: 72, y: 278, temprature: 230 },
        { id: 'E', x: 81, y: 200, temprature: 210 },
        { id: 'F', x: 72, y: 170, temprature: 100 },
        { id: 'G', x: 68, y: 477, temprature: 80 }
      ],
      options: {
        title: 'Bubble Chart Example',
        hAxis: { title: 'Life Expectancy' },
        vAxis: { title: 'Fertility Rate' },
        colorAxis: { colors: ['yellow', 'red'] },
        bubble: {
          textStyle: {
            fontSize: 11,
            fontName: 'Times-Roman',
            auraColor: 'none',
            color: 'green',
            bold: true,
            italic: true
          }
        }
      },
      width: 550,
      height: 400,
    }
  }
  candlestickChartControl() {
    return {
      isNextChild: false,
      chartData: [],
      tableData: [
        { name: 'Mon', value: 20, value1: 28, value2: 38, value3: 45 },
        { name: 'Tue', value: 31, value1: 38, value2: 55, value3: 66 },
        { name: 'Wed', value: 50, value1: 55, value2: 77, value3: 80 },
        { name: 'Thu', value: 77, value1: 77, value2: 66, value3: 50 },
        { name: 'Fri', value: 68, value1: 66, value2: 22, value3: 15 }
      ],
      options: {
        legend: 'none'
      },
      width: 550,
      height: 400,
    }
  }
  columnChartControl() {
    return {
      isNextChild: false,
      columnNames: ['Genre', 'Fantasy & Sci Fi', 'Romance', 'Mystery/Crime', 'General', 'Western', 'Literature'],
      tableData: [
        { id: '2000', col1: 10, col2: 24, col3: 20, col4: 32, col5: 18, col6: 5, style: 'stroke-color: #703593; stroke-width: 4; fill-color: #C5A5CF', annotation: '' },
        { id: '2005', col1: 16, col2: 22, col3: 23, col4: 30, col5: 16, col6: 9, style: 'stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2', annotation: '' },
        { id: '2010', col1: 28, col2: 19, col3: 29, col4: 30, col5: 12, col6: 13, style: 'opacity: 0.2', annotation: '' },
        { id: '2015', col1: 28, col2: 19, col3: 29, col4: 30, col5: 12, col6: 13, style: 'color: #76A7FA', annotation: '' },
        { id: '2020', col1: 28, col2: 19, col3: 29, col4: 30, col5: 12, col6: 13, style: 'color: #76A7FA', annotation: '' },
        { id: '2022', col1: 28, col2: 19, col3: 29, col4: 30, col5: 12, col6: 13, style: 'color: gray', annotation: '' },
        { id: '2023', col1: 28, col2: 19, col3: 29, col4: 30, col5: 12, col6: 13, style: 'stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2', annotation: '' },
      ],
      options: {
        title: "Density of Precious Metals, in g/cm^3",
        bar: { groupWidth: "95%" },
        legend: { position: "top", maxLines: 2 },
        hAxis: {
          title: 'Status'
        },
        vAxis: {
          title: 'Status Down ', minValue: 0
        },
        isStacked: false,
        colors: ['#5cb85c', '#f0ad4e', '#d9534f', '#5bc0de', '#f0ad4e', '#5cb85c', '#5bc0de']
      },
      width: 600,
      height: 400,
    }
  }
  orgChartControl() {
    return {
      isNextChild: false,
      tableData: [
        { id: '2010', col1: 10, col2: 24, col3: 20, col4: 32, col5: 18, col6: 5 },
        { id: '2020', col1: 16, col2: 22, col3: 23, col4: 30, col5: 16, col6: 9 },
        { id: '2030', col1: 28, col2: 19, col3: 29, col4: 30, col5: 12, col6: 13 },
      ],
      options: {
        title: "Density of Precious Metals, in g/cm^3",
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
      },
      width: 600,
      height: 400,
    }
  }
  ganttChartControl() {
    return {
      isNextChild: false,
      tableData:
        [
          { taskID: "Research", taskName: 'Find sources', resource: null, startDate: '1789, 3, 30', endDate: '1797, 2, 4', duration: null, percentComplete: 100, dependencies: null },
          { taskID: "Write", taskName: 'Write paper', resource: null, startDate: '1789, 3, 30', endDate: '1797, 2, 4', duration: 3, percentComplete: 25, dependencies: 'Research,Outline' },
          { taskID: "Cite", taskName: 'Create bibliography', resource: null, startDate: '1789, 3, 30', endDate: '1797, 2, 4', duration: 1, percentComplete: 20, dependencies: 'Research' },
          { taskID: "Complete", taskName: 'Hand in paper', resource: null, startDate: '1789, 3, 30', endDate: '1797, 2, 4', duration: 1, percentComplete: 0, dependencies: 'Cite,Write' },
          { taskID: "Outline", taskName: 'Outline paper', resource: null, startDate: '1789, 3, 30', endDate: '1797, 2, 4', duration: 1, percentComplete: 100, dependencies: 'Research' },
        ],
      options: {
        criticalPathEnabled: false,
        // isCriticalPath: false,
        criticalPathStyle: {
          stroke: '#e64a19',
          strokeWidth: false,
        },
        innerGridHorizLine: {
          stroke: false,
          strokeWidth: 5,
        },
        arrow: {
          angle: 100,
          width: 550,
          color: 'green',
          radius: 0,
        },
        innerGridTrack: { fill: '#fff3e0' },
        innerGridDarkTrack: { fill: '#ffcc80' }
      },
      columns: ['taskID', 'taskName', 'Resource', 'startDate', 'endDate', 'duration', 'percentComplete', 'dependencies'],
      arrowWidth: 5,
      height: 400,
    }
  }
  geoChartControl() {
    return {
      isNextChild: false,
      tableData: [
        { label: 'Country', value: 'Popularity' },
        { label: 'Germany', value: 200 },
        { label: 'United States', value: 300 },
        { label: 'Brazil', value: 400 },
        { label: 'Canada', value: 500 },
        { label: 'France', value: 600 },
        { label: 'RU', value: 700 },
      ],
      options: {
        region: '002', // Africa
        colorAxis: { colors: ['#00853f', 'black', '#e31b23'] },
        backgroundColor: '#81d4fa',
        datalessRegionColor: '#f8bbd0',
        defaultColor: '#f5f5f5',
      },
      width: 550,
      height: 400,
    }
  }
  histogramChartControl() {
    return {
      isNextChild: false,
      tableData: [
        { label: 'Dinosaur', value: 'Length' },
        { label: 'Acrocanthosaurus (top-spined lizard)', value: 12.2 },
        { label: 'Albertosaurus (Alberta lizard)', value: 9.1 },
        { label: 'Allosaurus (other lizard)', value: 12.2 },
        { label: 'Apatosaurus (deceptive lizard)', value: 22.9 },
        { label: 'Archaeopteryx (ancient wing)', value: 0.9 },
        { label: 'Argentinosaurus (Argentina lizard)', value: 36.6 },
        { label: 'Baryonyx (heavy claws)', value: 9.1 },
        { label: 'Brachiosaurus (arm lizard)', value: 30.5 },
        { label: 'Ceratosaurus (horned lizard)', value: 6.1 },
        { label: 'Coelophysis (hollow form)', value: 2.7 },
        { label: 'Compsognathus (elegant jaw)', value: 0.9 },
        { label: 'Deinonychus (terrible claw)', value: 2.7 },
        { label: 'Diplodocus (double beam)', value: 27.1 },
        { label: 'Dromicelomimus (emu mimic)', value: 3.4 },
        { label: 'Gallimimus (fowl mimic)', value: 5.5 },
        { label: 'Mamenchisaurus (Mamenchi lizard)', value: 21.0 },
        { label: 'Megalosaurus (big lizard)', value: 7.9 },
        { label: 'Microvenator (small hunter)', value: 1.2 },
        { label: 'Ornithomimus (bird mimic)', value: 4.6 },
        { label: 'Oviraptor (egg robber)', value: 1.5 },
        { label: 'Plateosaurus (flat lizard)', value: 7.9 },
        { label: 'Sauronithoides (narrow-clawed lizard)', value: 2.0 },
        { label: 'Seismosaurus (tremor lizard)', value: 45.7 },
        { label: 'Spinosaurus (spiny lizard)', value: 12.2 },
        { label: 'Supersaurus (super lizard)', value: 30.5 },
        { label: 'Tyrannosaurus (tyrant lizard)', value: 15.2 },
        { label: 'Ultrasaurus (ultra lizard)', value: 30.5 },
        { label: 'Velociraptor (swift robber)', value: 1.8 }
      ],
      options: {
        title: 'Histogram Chart',
        legend: { position: 'none' },
        colors: ['green'],
        histogram: {
          lastBucketPercentile: 5,
          bucketSize: 0.01,
          maxNumBuckets: 400,
          minValue: -1,
          maxValue: 1
        },
        vAxis: { scaleType: 'mirrorLog' },
        hAxis: {},
      },
      // colors: ['#5C3292', '#1A8763', '#871B47', '#999999'],
      bar: { gap: 0 },
      width: 550,
      height: 400,
    }
  }
  treeMapChartControl() {
    return {
      isNextChild: false,
      tableData: [
        { id: 'Global', value1: null, value2: 0, value3: 0 },
        { id: 'America', value1: 'Global', value2: 0, value3: 0 },
        { id: 'Europe', value1: 'Global', value2: 0, value3: 0 },
        { id: 'Asia', value1: 'Global', value2: 0, value3: 0 },
        { id: 'Australia', value1: 'Global', value2: 0, value3: 0 },
        { id: 'Africa', value1: 'Global', value2: 0, value3: 0 },
        { id: 'Brazil', value1: 'America', value2: 0, value3: 10 },
        { id: 'USA', value1: 'America', value2: 11, value3: 31 },
        { id: 'Mexico', value1: 'America', value2: 52, value3: 12 },
        { id: 'Canada', value1: 'America', value2: 24, value3: -23 },
        { id: 'France', value1: 'Europe', value2: 16, value3: -11 },
        { id: 'Germany', value1: 'Europe', value2: 42, value3: -2 },
        { id: 'Sweden', value1: 'Europe', value2: 31, value3: -13 },
        { id: 'Italy', value1: 'Europe', value2: 17, value3: 4 },
        { id: 'UK', value1: 'Europe', value2: 21, value3: -5 },
        { id: 'China', value1: 'Asia', value2: 36, value3: 4 },
        { id: 'Japan', value1: 'Asia', value2: 20, value3: -12 },
        { id: 'India', value1: 'Asia', value2: 40, value3: 63 },
        { id: 'Laos', value1: 'Asia', value2: 4, value3: 34 },
        { id: 'Mongolia', value1: 'Asia', value2: 1, value3: -5 },
        { id: 'Israel', value1: 'Asia', value2: 12, value3: 24 },
        { id: 'Iran', value1: 'Asia', value2: 18, value3: 13 },
        { id: 'Pakistan', value1: 'Asia', value2: 11, value3: -52 },
        { id: 'Egypt', value1: 'Africa', value2: 21, value3: 0 },
        { id: 'S. Africa', value1: 'Africa', value2: 30, value3: 43 },
        { id: 'Sudan', value1: 'Africa', value2: 12, value3: 2 },
        { id: 'Congo', value1: 'Africa', value2: 10, value3: 12 },
        { id: 'Zaire', value1: 'Africa', value2: 31, value3: 10 },
      ],
      options: { // For v49 or before
        highlightOnMouseOver: true,
        maxDepth: 1,
        maxPostDepth: 2,
        minHighlightColor: 'black',
        midHighlightColor: 'yellow',
        // maxHighlightColor: 'purple',
        // minColor: 'red',
        midColor: 'blue',
        maxColor: 'green',
        headerHeight: 15,
        showScale: true,
        useWeightedAverageForAggregation: true
      },
      width: 550,
      height: 400,
    }
  }
  tableChartControl() {
    return {
      isNextChild: false,
      tableData: [
        { col1: 'Mike', col2: 'John', col3: 'Doe', col4: 'Bob' },
        { col1: 'Bob', col2: 'Dinosaur', col3: 'Alice', col4: 'John' },
        { col1: 'John', col2: 'Mike', col3: 'Dinosaur', col4: 'Bob' },
        { col1: 'Dinosaur', col2: 'Doe', col3: 'John', col4: 'Doe' },

      ],
      width: 550,
      height: 400,
    }
  }
  lineChartControl() {
    return {
      isNextChild: false,
      tableData: [
        { id: 1, col1: 37.8, col2: 80.8, col3: 41.8 },
        { id: 2, col1: 30.9, col2: 69.5, col3: 32.4 },
        { id: 3, col1: 25.4, col2: 57, col3: 25.7 },
        { id: 4, col1: 11.7, col2: 18.8, col3: 10.5 },
        { id: 5, col1: 11.9, col2: 17.6, col3: 10.4 },
        { id: 6, col1: 8.8, col2: 13.6, col3: 7.7 },
        { id: 7, col1: 7.6, col2: 12.3, col3: 9.6 },
        { id: 8, col1: 12.3, col2: 29.2, col3: 10.6 },
        { id: 9, col1: 16.9, col2: 42.9, col3: 14.8 },
        { id: 10, col1: 12.8, col2: 30.9, col3: 11.6 },
        { id: 11, col1: 5.3, col2: 7.9, col3: 4.7 },
        { id: 12, col1: 6.6, col2: 8.4, col3: 5.2 },
        { id: 13, col1: 4.8, col2: 6.3, col3: 3.6 },
        { id: 14, col1: 4.2, col2: 6.2, col3: 3.4 },
      ],
      options: {
        chart: {
          title: "Line Chart",
          subtitle: 'Based on most recent and previous census data',
        },
      },
      width: 550,
      height: 400,
    }
  }
  sankeyChartControl() {
    return {
      isNextChild: false,
      tableData: [
        { label: 'Brazil', link: 'Portugal', value: 5 },
        { label: 'Brazil', link: 'France', value: 1 },
        { label: 'Brazil', link: 'Spain', value: 1 },
        { label: 'Brazil', link: 'England', value: 1 },
        { label: 'Canada', link: 'Portugal', value: 1 },
        { label: 'Canada', link: 'France', value: 5 },
        { label: 'Canada', link: 'England', value: 1 },
        { label: 'Mexico', link: 'Portugal', value: 1 },
        { label: 'Mexico', link: 'France', value: 1 },
        { label: 'Mexico', link: 'Spain', value: 5 },
        { label: 'Mexico', link: 'England', value: 1 },
        { label: 'USA', link: 'Portugal', value: 1 },
        { label: 'USA', link: 'France', value: 1 },
        { label: 'USA', link: 'Spain', value: 1 },
        { label: 'USA', link: 'England', value: 5 },
        { label: 'Portugal', link: 'Angola', value: 2 },
        { label: 'Portugal', link: 'Senegal', value: 1 },
        { label: 'Portugal', link: 'Morocco', value: 1 },
        { label: 'Portugal', link: 'South Africa', value: 3 },
        { label: 'France', link: 'Angola', value: 1 },
        { label: 'France', link: 'Senegal', value: 3 },
        { label: 'France', link: 'Mali', value: 3 },
        { label: 'France', link: 'Morocco', value: 3 },
        { label: 'France', link: 'South Africa', value: 1 },
        { label: 'Spain', link: 'Senegal', value: 1 },
        { label: 'Spain', link: 'Morocco', value: 3 },
        { label: 'Spain', link: 'South Africa', value: 1 },
        { label: 'England', link: 'Angola', value: 1 },
        { label: 'England', link: 'Senegal', value: 1 },
        { label: 'England', link: 'Morocco', value: 2 },
        { label: 'England', link: 'South Africa', value: 7 },
        { label: 'South Africa', link: 'China', value: 5 },
        { label: 'South Africa', link: 'India', value: 1 },
        { label: 'South Africa', link: 'Japan', value: 3 },
        { label: 'Angola', link: 'China', value: 5 },
        { label: 'Angola', link: 'India', value: 1 },
        { label: 'Angola', link: 'Japan', value: 3 },
        { label: 'Senegal', link: 'China', value: 5 },
        { label: 'Senegal', link: 'India', value: 1 },
        { label: 'Senegal', link: 'Japan', value: 3 },
        { label: 'Mali', link: 'China', value: 5 },
        { label: 'Mali', link: 'India', value: 1 },
        { label: 'Mali', link: 'Japan', value: 3 },
        { label: 'Morocco', link: 'China', value: 5 },
        { label: 'Morocco', link: 'India', value: 1 },
        { label: 'Morocco', link: 'Japan', value: 3 }
      ],
      options: {
      },
      width: 550,
      height: 400,
    }
  }
  scatterChartControl() {
    return {
      isNextChild: false,
      tableData: [
        { id: 0, value: 67 }, { id: 1, value: 88 }, { id: 2, value: 77 },
        { id: 3, value: 93 }, { id: 4, value: 85 }, { id: 5, value: 91 },
        { id: 6, value: 71 }, { id: 7, value: 78 }, { id: 8, value: 93 },
        { id: 9, value: 80 }, { id: 10, value: 82 }, { id: 0, value: 75 },
        { id: 5, value: 80 }, { id: 3, value: 90 }, { id: 1, value: 72 },
        { id: 5, value: 75 }, { id: 6, value: 68 }, { id: 7, value: 98 },
        { id: 3, value: 82 }, { id: 9, value: 94 }, { id: 2, value: 79 },
        { id: 2, value: 95 }, { id: 2, value: 86 }, { id: 3, value: 67 },
        { id: 4, value: 60 }, { id: 2, value: 80 }, { id: 6, value: 92 },
        { id: 2, value: 81 }, { id: 8, value: 79 }, { id: 9, value: 83 },
        { id: 3, value: 75 }, { id: 1, value: 80 }, { id: 3, value: 71 },
        { id: 3, value: 89 }, { id: 4, value: 92 }, { id: 5, value: 85 },
        { id: 6, value: 92 }, { id: 7, value: 78 }, { id: 6, value: 95 },
        { id: 3, value: 81 }, { id: 0, value: 64 }, { id: 4, value: 85 },
        { id: 2, value: 83 }, { id: 3, value: 96 }, { id: 4, value: 77 },
        { id: 5, value: 89 }, { id: 4, value: 89 }, { id: 7, value: 84 },
        { id: 4, value: 92 }, { id: 9, value: 98 }
      ],
      options: {
        width: 800,
        height: 500,
        chart: {
          title: "Pie Chart",
          subtitle: 'based on hours studied',
        },
        axes: {
          x: {
            0: { side: 'top' }
          }
        }
      },
      width: 550,
      height: 400,
    }
  }
  timelineChartControl() {
    return {
      isNextChild: false,
      tableData: [
        { label: 'Magnolia Room', value: 'CSS Fundamentals', startDate: '1789, 3, 30', endDate: '1797, 2, 4' },
        { label: 'Magnolia Room1', value: 'Intro JavaScript', startDate: '1789, 3, 30', endDate: '1797, 2, 4' },
        { label: 'Magnolia Room2', value: 'Advanced JavaScript', startDate: '1789, 3, 30', endDate: '1797, 2, 4' },
      ],
      options: {
        timeline: {
          showRowLabels: false,
          colorByRowLabel: true,
          singleColor: '#8d8',
          rowLabelStyle: { fontName: 'Helvetica', fontSize: 24, color: '#603913' },
          barLabelStyle: { fontName: 'Garamond', fontSize: 14 }
        },
        backgroundColor: '#ffd',
        alternatingRowStyle: false,
        colors: ['#cbb69d', '#603913', '#c69c6e'],
      },
      width: 550,
      height: 400,
    }
  }
  mapControl() {
    return {
      isNextChild: false,
    }
  }
  areaChartControl() {
    return {
      isNextChild: false,
      tableData: [
        { label: '2013', col1: 1000, col2: 400, col3: 400, col4: 400 },
        { label: '2014', col1: 1170, col2: 460, col3: 460, col4: 460 },
        { label: '2015', col1: 660, col2: 1120, col3: 1120, col4: 1120 },
        { label: '2016', col1: 1030, col2: 540, col3: 540, col4: 540 }
      ],
      options: {
        title: 'Company Performance',
        isStacked: 'relative',
        legend: { position: 'top', maxLines: 3 },
        selectionMode: 'multiple',
        tooltip: { trigger: 'selection' },
        hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
        vAxis: { minValue: 0 }
      },
      width: 550,
      height: 400,
    }
  }
  comboChartControl() {
    return {
      isNextChild: false,
      tableData: [
        { label: '2004/05', col1: 165, col2: 938, col3: 522, col4: 998, col5: 450, col6: 614.6 },
        { label: '2005/06', col1: 135, col2: 1120, col3: 599, col4: 1268, col5: 288, col6: 682 },
        { label: '2006/07', col1: 157, col2: 1167, col3: 587, col4: 807, col5: 397, col6: 623 },
        { label: '2007/08', col1: 139, col2: 1110, col3: 615, col4: 968, col5: 215, col6: 609.4 },
        { label: '2008/09', col1: 136, col2: 691, col3: 629, col4: 1026, col5: 366, col6: 569.6 }
      ],
      options: {
        title: 'Monthly Coffee Production by Country',
        vAxis: { title: 'Cups' },
        hAxis: { title: 'Month' },
        seriesType: 'bars',
        series: { 5: { type: 'line' } }
      },
      width: 550,
      height: 400,
    }
  }
  steppedAreaChartControl() {
    return {
      isNextChild: false,
      tableData: [
        { label: 'Alfred Hitchcock (1935)', value1: 8.4, value2: 7.9, value3: 5.3, value4: 8.9 },
        { label: 'Ralph Thomas (1959)', value1: 6.9, value2: 6.5, value3: 9.5, value4: 3.5 },
        { label: 'Don Sharp (1978)', value1: 6.5, value2: 6.4, value3: 2.4, value4: 4.4 },
        { label: 'James Hawes (2008)', value1: 4.4, value2: 6.2, value3: 3.2, value4: 5.2 }
      ],
      options: {
        backgroundColor: '#ddd',
        legend: { position: 'bottom' },
        connectSteps: false,
        colors: ['#4374E0', '#53A8FB', '#F1CA3A', '#E49307'],
        isStacked: true,
        vAxis: {
          minValue: 0,
          ticks: [0, .3, .6, .9, 1]
        },
        selectionMode: 'multiple',
      },
      width: 550,
      height: 400,
    }
  }
}
