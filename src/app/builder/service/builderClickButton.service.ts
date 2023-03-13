import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class BuilderClickButtonService {

  getDrawerConfig(node: any) {
    return { color: node.color, btnText: node.btnText, isClosable: node.isClosable, icon: node.icon, extra: node.extra, isKeyboard: node.isKeyboard, title: node.title, footerText: node.footerText, isVisible: node.isVisible, placement: node.placement, size: node.size, width: node.width, height: node.height, offsetX: node.offsetX, offsetY: node.offsetY, wrapClassName: node.wrapClassName, zIndex: node.zIndex, onClose: node.onClose };
  }
  getTransferConfig(node: any) {
    debugger
    return { disabled: node.disabled, showSearch: node.showSearch, firstBoxTitle: node.firstBoxTitle, secondBoxTitle: node.secondBoxTitle, leftButtonLabel: node.leftButtonLabel, rightButtonLabel: node.rightButtonLabel, searchPlaceHolder: node.searchPlaceHolder, status: node.status, notFoundContentLabel: node.notFoundContentLabel, options: node.list };
  }
  progressBarConfig(node: any) {
    debugger
    return { progressBarType: node.progressBarType, percent: node.percent, showInfo: node.showInfo, status: node.status, strokeLineCap: node.strokeLineCap, success: node.success };
  }
  getGridConfig(node: any) {
    return { nzTitle: node.nzTitle, nzFooter: node.nzFooter, nzPaginationPosition: node.nzPaginationPosition, nzPaginationType: node.nzPaginationType, nzLoading: node.nzLoading, nzShowPagination: node.nzShowPagination, nzBordered: node.nzBordered, showColumnHeader: node.showColumnHeader, noResult: node.noResult, nzSimple: node.nzSimple, nzSize: node.nzSize, nzShowSizeChanger: node.nzShowSizeChanger, showCheckbox: node.showCheckbox, expandable: node.expandable, tableScroll: node.tableScroll, fixHeader: node.fixHeader, fixedColumn: node.fixedColumn };
  }
  getCommentConfig(node: any) {
    return { avatar: node.avatar, author: node.author };
  }
  getRateFieldsConfig(node: any) {
    return {
      clear: node.clear, author: node.author, allowHalf: node.allowHalf, focus: node.focus, icon: node.icon, showCount: node.showCount, disabled: node.disabled,
    };
  }

  getSkeletonConfig(node: any) {
    return { size: node.size, buttonShape: node.buttonShape, avatarShape: node.avatarShape };
  }
  getBadgeConfig(node: any) {
    return { nzCount: node.nzCount, nzText: node.nzText, nzColor: node.nzColor, nzStatus: node.nzStatus };
  }
  getMentionConfig(node: any) {
    return { loading: node.loading, status: node.status, options: node.options, position: node.position, disabled: node.disabled, };
  }


  getEmptyConfig(node: any) {
    return { text: node.text, icon: node.icon, link: node.link, btnText: node.btnText, color: node.color, content: node.content };
  }
  getSegmentedConfig(node: any) {
    return { options: node.options, block: node.block, disabled: node.disabled, size: node.size, defaultSelectedIndex: node.defaultSelectedIndex };
  }
  getnzTagConfig(node: any) {
    return { color: node.color, mode: node.mode, checked: node.checked };
  }
  getMessageConfig(node: any) {
    return { content: node.content, duration: node.duration, messageType: node.messageType, pauseOnHover: node.pauseOnHover, animate: node.animate };
  }
  getnotificationConfig(node: any) {
    return { content: node.content, icon: node.icon, color: node.color, duration: node.duration, pauseOnHover: node.pauseOnHover, animate: node.animate };
  }
  getStatisticConfig(node: any) {
    return { prefixIcon: node.prefixIcon, suffixIcon: node.suffixIcon, options: node.statisticArray };
  }

  getlistConfig(node: any) {
    return {
      headerText: node.headerText,
      footerText: node.footerText,
      formatter: node.formatter,
      size: node.size,
      isBordered: node.isBordered,
      isSplit: node.isSplit,
      isEdit: node.isEdit,
      isUpdate: node.isUpdate,
      isDelete: node.isDelete,
      isLoad: node.isLoad,
      loadText: node.loadText,
      options: node.options,
    };
  }
  getModalConfig(node: any) {
    return {
      btnLabel: node.btnLabel,
      modalContent: node.modalContent,
      modalTitle: node.modalTitle,
      cancalButtontext: node.cancalButtontext,
      centered: node.centered,
      okBtnLoading: node.okBtnLoading,
      cancelBtnLoading: node.cancelBtnLoading,
      okBtnDisabled: node.okBtnDisabled,
      cancelDisabled: node.cancelDisabled,
      ecsModalCancel: node.ecsModalCancel,
      okBtnText: node.okBtnText,
      closeIcon: node.closeIcon,
      width: node.width,
      showCloseIcon: node.showCloseIcon,
      zIndex: node.zIndex,
    };
  }

  getDescriptionConfig(node: any) {
    return {
      nzExtra: node.nzExtra,
      formatter: node.formatter,
      size: node.size,
      isBordered: node.isBordered,
      isColon: node.isColon,
    }
  }

  getDescriptionChildConfig(node: any) {
    return {
      content: node.content,
      nzStatus: node.nzStatus,
      isBadeg: node.isBadeg,
      nzSpan: node.nzSpan,
    }
  }
  getTreeConfig(node: any) {
    return {

      checkable: node.checkable,
      expandIcon: node.expandIcon,
      closingexpandicon: node.closingexpandicon,
      expand: node.expand
    }
  }

  getAffixConfig(node: any) {
    return {
      affixType: node.affixType,
      margin: node.margin,
      target: node.target,
    }
  }

  getBacktopConfig(node: any) {
    return {
      duration: node.duration,
      visibleafter: node.visibleafter,
      target: node.target,
    }
  }

  getAvatarConfig(node: any) {
    return {
      icon: node.icon,
      text: node.text,
      src: node.src,
      bgColor: node.bgColor,
      color: node.color,
      gap: node.gap,
      alt: node.alt,
    }
  }

  getPopOverConfig(node: any) {
    return {
      btnLabel: node.btnLabel,
      content: node.content,
      nzPopoverTitle: node.nzPopoverTitle,
      arrowPointAtCenter: node.arrowPointAtCenter,
      trigger: node.trigger,
      placement: node.placement,
      visible: node.visible,
      mouseEnterDelay: node.mouseEnterDelay,
      mouseLeaveDelay: node.mouseLeaveDelay,
      backdrop: node.backdrop,
    }
  }

  getResultConfig(node: any) {
    return {
      status: node.status,
      resultTitle: node.resultTitle,
      subTitle: node.subTitle,
      btnLabel: node.btnLabel,
    }
  }

  getImageUploadConfig(node: any) {
    return {
      imageClass: node.imageClass,
      alt: node.alt,
      source: node.source,
      imagHieght: node.imagHieght,
      imageWidth: node.imageWidth,
      repeat: '',
      image: node.base64Image,
    }
  }

  getToastrConfig(node: any) {
    return {
      timeOut: node.timeOut,
      positionClass: node.positionClass,
      progressBar: node.progressBar,
      message: node.message,
      toastrType: node.toastrType,
      repeat: '',
    }
  }

  getinvoiceConfig(node: any) {
    return {
      invoiceNumbertitle: node.invoiceNumberLabel,
      datetitle: node.datelabel,
      paymentTermstitle: node.paymentTermsLabel,
      poNumber: node.poNumber,
      billTotitle: node.billToLabel,
      dueDatetitle: node.dueDateLabel,
      shipTotitle: node.shipToLabel,
      notestitle: node.notesLabel,
      subtotaltitle: node.subtotalLabel,
      dicounttitle: node.dicountLabel,
      shippingtitle: node.shippingLabel,
      taxtitle: node.taxLabel,
      termstitle: node.termsLabel,
      totaltitle: node.totalLabel,
      amountpaidtitle: node.amountpaidLabel,
      balanceDuetitle: node.balanceDueLabel,
    }
  }

  getRangeSliderConfig(node: any) {
    return {
      min: node.min,
      max: node.max,
      sliderType: node.sliderType,
      disabled: node.disabled,
      tooltip: node.tooltip,
      hideExpression: node.hideExpression,
      showValue: node.showValue,
    }
  }

  getInputGroupGridConfig(node: any) {
    return {
    }
  }

  getCardConfig(node: any) {
    return {
      icon: node?.icon,
      name: node?.name,
      total: node?.total,
      link: node?.link,
      tooltip: node?.tooltip,
    }
  }

  getFixedDivConfig(node: any) {
    return {
    }
  }

  getTuiCalenderConfig(node: any) {
    return {
      options: node.options,
      viewType: node.viewType,
      disabled: node.disabled,
    }
  }

  getMultiFileUploadConfig(node: any) {
    return {
      multiple:node.multiple,
      disabled:node.disabled,
    }
  }

  getTextEditorConfig(node: any) {
    return {
    }
  }

  getSwitchConfig(node: any) {
    return {
      switchType: node.switchType,
      switchPosition: node.switchPosition,
    }
  }

  getTabsConfig(node: any) {
    return {
      icon: node.icon,
      tooltip: node.tooltip,
    }
  }

  getKanbanConfig(node: any) {
    return {
      nodes: node.nodes,
      tooltip: node?.tooltip,
    }
  }

  getKanbanTaskConfig(node: any) {
    return {
    }
  }
  //  else if (type == "kanbanTask") {
  //   // if (this.selectdNode) {
  //   //   for (let index = 0; index < this.selectdNode.users.length; index++) {
  //   //     if (typeof this.selectdNode?.users[index] !== "string") {
  //   //       this.selectdNode?.users[index] = JSON.stringify(this.selectdNode?.users[index]);
  //   //     } else {
  //   //       this.selectdNode?.users[index] = JSON.parse(this.selectdNode?.users[index]);
  //   //       this.selectdNode?.users[index] = JSON.stringify(this.selectdNode?.users[index]);
  //   //     }
  //   //   }
  //   // }
  //   configObj = {
  //     id: this.selectdNode.id as string,
  //     title: this.selectdNode.title,
  //     options: this.selectdNode.,
  //     tooltip: this.selectdNode.tooltip,
  //     hideExpression: this.selectdNode.hideExpression,
  //     // repeat: this.addPropertieInOldScreens(this.selectdNode.repeat, "repeat"),
  //   }
  //   this.fieldData.commonData = _formFieldData.commonOtherConfigurationFields;
  //   this.fieldData.formData = _formFieldData.kanbanTaskFeilds;
  // }

  getMainDashonicTabsConfig(node: any) {
    return {
      tabtitle: node.title,
      selectedIndex: node.selectedIndex,
      animated: node.animated,
      size: node.size,
      tabPosition: node.tabPosition,
      tabType: node.tabType,
      hideTabs: node.hideTabs,
      nodes: node.nodes,
      centerd: node.centerd,
    }
  }

  getProgressBarConfig(node: any) {
    debugger
    return {
      progressBarType: node.progressBarType,
      percent: node.percent,
      showInfo: node.showInfo,
      status: node.status,
      strokeLineCap: node.strokeLineCap,
      success: node.success,
    }
  }

  getDividerConfig(node: any) {
    return {
      dividerText: node.dividerText,
      icon: node.icon,
      dashed: node.dashed,
      dividerType: node.dividerType,
      plain: node.plain,
      orientation:node.orientation,
    }
  }

  getVideoConfig(node: any) {
    return {
      videoRatio: node.videoConfig[0]?.videoRatio,
      videoSrc: node.videoConfig[0]?.videoSrc,
    }
  }

  getAudioConfig(node: any) {
    return {
      audioSrc: node.audioSrc,
      link: "",
    }
  }

  getcarouselCrossfadeConfig(node: any) {
    return {
      effect: node.effect,
      dotPosition: node.dotPosition,
      options: node.carousalConfig,
      autoPlay: node.autoPlay,
      autolPlaySpeed: node.autolPlaySpeed,
      showDots: node.showDots,
      enableSwipe: node.enableSwipe,
    }
  }

  getAlertConfig(node: any) {
    debugger
    return {
      icon: node.icon,
      text: node.text,
      alertColor: node.alertColor,
      alertType: node.alertType,
      banner: node.banner,
      showIcon: node.showIcon,
      closeable: node.closeable,
      description: node.description,
      closeText: node.closeText,
      iconType: node.iconType,
      action: node.action,
    }
  }

  getTimelineConfig(node: any) {
    return {
      dotIcon: node.dotIcon,
      labelText: node.labelText,
      color: node.color,
      position: node.position,
      mode: node.mode,
      mainIcon: node.mainIcon,
      reverse: node.reverse,
      options: node.data,

    }
  }

  getSimpleCardWithHeaderBodyFooterConfig(node: any) {
    return {
      headerText: node.headerText,
      bodyText: node.bodyText,
      footerText: node.footerText,
      textAlign: node.textAlign,
      link: "",
      height: node.height,
    }
  }

  getSharedMessagesChartConfig(node: any) {
    return {
      titleIcon: node?.labelIcon,
      heading: node?.heading,
      headingIcon: node?.headingIcon,
      headingColor: node?.headingColor,
      subHeading: node?.subHeading,
      subHeadingIcon: node?.subHeadingIcon,
      subheadingColor: node?.subheadingColor,
      tooltip: node?.tooltip,
      link: node?.link,
      options: node?.sharedMessagesConfig,
    }
  }

  getBrowserCardConfig(node: any) {
    return {
      icon: node.icon,
      options: node.chart,
      limit: node?.limit,
      defaultColor: node?.defaultColor,
      belowpercentage: node?.belowpercentage,
      below_percentage_color: node?.belowpercentageColor,
    }
  }
  getBrowserCombineChartConfig(node: any) {
    return {
      icon: node.icon,
      options: node.chart,
      limit: node?.limit,
      defaultColor: node?.defaultColor,
      belowpercentage: node?.belowpercentage,
      below_percentage_color: node?.belowpercentageColor,
    }
  }
  getWidgetSectionCardConfig(node: any) {
    return {
      limit: node?.limit,
      percentage: node?.belowpercentage,
      below_percentage_color: node?.belowpercentageColor,
      options: node.section,
    }
  }

  getSectionCardConfig(node: any) {
    return {
      limit: node?.limit,
      key: node?.key,
      percentage: node?.belowpercentage,
      below_percentage_color: node?.belowpercentageColor,
      options: node?.section,
    }
  }

  getChartConfig(node: any) {
    return {
      options: node?.section,
      sub_title: node.section[0].filterData[0].subheading,
    }
  }

  getDonutChartConfig(node: any) {
    return {
      options: '',
    }
  }

  getDonuteSaleChartConfig(node: any) {
    return {
      link: node.link,
      thisTitle: node.thisTitle,
      lastTitle: node.lastTitle,
      prevTitle: node.prevTitle,
      // options1: node.,
      options: '',
    }
  }

  getSalesAnalyticschartConfig(node: any) {
    return {
      options: '',
    }
  }


  getHeadingConfig(node: any) {
    debugger
    return {
      // padding: '',
      level: node.level,
      text: node.text,
      style: node.style,
      textAlignment: node.textAlign,
      headingColor: node.headingColor,
    }
  }

  getParagraphConfig(node: any) {
    return {
      padding: '',
      text: node.text,
      style: node.style,
      textAlignment: node.textAlign,
      color: node.color,
    }
  }

  getFormlyConfig(node: any) {
    debugger
    return {
      placeholder: node.formly[0].fieldGroup[0].templateOptions?.placeholder,
      defaultValue: node.formly[0].fieldGroup[0].defaultValue,
      options: node.formly[0].fieldGroup[0].templateOptions?.options,
      required: node.formly[0].fieldGroup[0].templateOptions?.required,
      tooltip: node.formly[0].fieldGroup[0].templateOptions?.tooltip,
      titleIcon: node.formly[0].fieldGroup[0].templateOptions?.['titleIcon'],
      rows: node.formly[0].fieldGroup[0].templateOptions?.rows,
      formCheck: node.formly[0].fieldGroup[0].templateOptions?.['formCheck'],
      addonLeft: node.formly[0].fieldGroup[0].templateOptions.config.addonLeft,
      addonRight: node.formly[0].fieldGroup[0].templateOptions.config.addonRight,
      disabled: node.formly[0].fieldGroup[0].templateOptions?.disabled,
      readonly: node.formly[0].fieldGroup[0].templateOptions?.readonly,
      hideExpression: node.formly[0].fieldGroup[0].templateOptions?.hideExpression,
    }
  }
  getMaskingFormlyConfig(node: any) {
    return {
      focus: node.formly[0].fieldGroup[0].focus,
      defaultValue: node.formly[0].fieldGroup[0].defaultValue,
      title: node.formly[0].fieldGroup[0].templateOptions?.label,
      required: node.formly[0].fieldGroup[0].templateOptions?.required,
      readonly: node.formly[0].fieldGroup[0].templateOptions?.readonly,
      disabled: node.formly[0].fieldGroup[0].templateOptions?.disabled,
      maskString: node.formly[0].fieldGroup[0].templateOptions?.['maskString'],
      masktitle: node.formly[0].fieldGroup[0].templateOptions?.['masktitle'],
      placeholder: node.formly[0].fieldGroup[0].templateOptions?.placeholder,
      titleIcon: node.formly[0].fieldGroup[0].templateOptions?.['labelIcon'],
      addonLeft: node.formly[0].fieldGroup[0].templateOptions.addonLeft,
      addonRight: node.formly[0].fieldGroup[0].templateOptions.addonRight,

    }
  }
  getButtonConfig(node: any) {
    debugger
    return {
      color: node.color,
      title: node.title,
      hideExpression: node.hideExpression,
      format: node.format,
      disabled: node.disabled,
      btnIcon: node.btnIcon,
      tooltip: node.tooltip,
      nzBlock: node.nzBlock,
      nzSize: node.nzSize,
      nzShape: node.nzShape,
      nzLoading: node.nzLoading,
      nzGhost: node.nzGhost,
      nzDanger: node.nzDanger,
    }
  }
  getDropdownButtonConfig(node: any) {
    return {
      color: node.color,
      hideExpression: node.hideExpression,
      options: node.dropdownOptions,
      format: node.format,
      tooltip: node.tooltip,
      btnIcon: node.btnIcon,
      disabled: node.disabled,
      nzGhost: node.nzGhost,
      nzLoading: node.nzLoading,
      nzShape: node.nzShape,
      nzSize: node.nzSize,
      nzBlock: node.nzBlock,
      nzDanger: node.nzDanger,
      trigger:node.trigger,
        placement:node.placement,
        visible:node.visible,
        clickHide:node.clickHide,
    }
  }
  getAccordionButtonConfig(node: any) {
    return {
      title: node.title,
      nzBordered: node.nzBordered,
      nzGhost: node.nzGhost,
      nzExpandIconPosition: node.nzExpandIconPosition,
      nzDisabled: node.nzDisabled,
      nzExpandedIcon: node.nzExpandedIcon,
      nzShowArrow: node.nzShowArrow,
    }
  }
  getLinkButtonConfig(node: any) {
    return {
      color: node.color,
      hideExpression: node.hideExpression,
      tooltip: node.tooltip,
      href: node.href,
      target: node.target,
      format: node.format,
      btnType: node.btnType,
      btnIcon: node.btnIcon,
      disabled: node.disabled,
      nzGhost: node.nzGhost,
      nzLoading: node.nzLoading,
      nzShape: node.nzShape,
      nzSize: node.nzSize,
      nzBlock: node.nzBlock,
      nzDanger: node.nzDanger,
    }
  }
  getBtnGroupConfig(node: any) {
    return {
      btngroupformat: node.btngroupformat,
    }
  }
  getPagesConfig(node: any) {
    return {
      variables: node.screenVariables
    }
  }
  getHeaderConfig(node: any) {
    return {
      headingSize: node.headingSize,
      header: node.header,
      labelPosition: node.labelPosition,
      alertPosition: node.alertPosition,
    }
  }
  getFooterConfig(node: any) {
    return {
      footer: node.footer,
    }
  }
  getSectionConfig(node: any) {
    if (node.children?.at(1)?.children[0].formly) {
      return {
        title: node.title,
        disabled: node.sectionDisabled,
        className: node.className,
        labelPosition: node.labelPosition,
        repeatable: node.repeatable,
        wrappers: node.children?.at(1)?.children[0].formly[0].fieldGroup[0].wrappers == undefined ? "" : node.children?.at(1)?.children[0].formly[0].fieldGroup[0].wrappers?.at(0),
      }
    }
    else {
      return {
        title: node.title,
        disabled: node.sectionDisabled,
        className: node.className,
        titlePosition: node.labelPosition,
        repeatable: node.repeatable,
      }
    }
  }
  getSectionFooterConfig(node: any) {
    return {
      footer: node.footer,
    }
  }
  getSectionBodyConfig(node: any) {
    return {
    }
  }
  getSectionHeaderConfig(node: any) {
    return {
      headingSize: node.headingSize,
      header: node.header,
      expanded: node.expanded,
      titlePosition: node.labelPosition,
      backGroundColor: node.backGroundColor,
      textColor: node.textColor,
    }
  }
  getStepperConfig(node: any) {
    return {
      icon: node.icon,
      disabled: node.disabled,
      description: node.description,
      status: node.status,
      label: node.label,
      subtitle: node.subtitle,
      percentage: node.percentage,
    }
  }
  getStepperMainConfig(node: any) {
    return {
      selectedIndex: node.selectedIndex,
      direction: node.direction,
      placement: node.placement,
      size: node.size,
      status: node.status,
      disabled: node.disabled,
      nodes: node.nodes,
      stepperType: node.stepperType,
    }
  }
  getMainTabsConfig(node: any) {
    return {
      className: node.className,
      steppertitle: node.formly[0].fieldGroup[0].templateOptions?.label,
      stepperFormat: node.formly[0].fieldGroup[0].templateOptions?.['stepperFormat'],
      buttonText: node.formly[0].fieldGroup[0].templateOptions?.['buttonText'],
      buttonIcon: node.formly[0].fieldGroup[0].templateOptions?.['buttonIcon'],
      buttonColor: node.formly[0].fieldGroup[0].templateOptions?.['buttonColor'],
      tabsPosition: node.formly[0].fieldGroup[0].templateOptions?.['tabsPosition'],
      selectTabColor: node.formly[0].fieldGroup[0].templateOptions?.['selectTabColor'],
      tabsDisplayType: node.formly[0].fieldGroup[0].templateOptions?.['tabsDisplayType'],
    }
  }
  // Menu builder Click Button

  getMenuAttributeConfig(node: any) {
    return {
      menuID: node.id,
      menuLabel: node.title,
      menuIcon: node.icon,
      menuLink: node.link,
      menuRequired: node.isTitle,
      textColor: node.textColor,
    }
  }
  getTabAttributeConfig(node: any) {
    return {
      id: node.id,
      className: node.className,
      tabLabel: node.dashonicTabsConfig[0]?.tabLabel,
      tabIcon: node.dashonicTabsConfig[0]?.tabIcon,
      link: node.dashonicTabsConfig[0]?.link,
    }
  }
  getMainTabAttributeConfig(node: any) {
    return {
      id: node.id as string,
      className: node.className,
      tabLabel: node.title,
      tabsPosition: node.mainDashonicTabsConfig[0]?.tabsPosition,
      selectTabColor: node.mainDashonicTabsConfig[0]?.selectTabColor,
      tabsDisplayType: node.mainDashonicTabsConfig[0]?.tabsDisplayType,
      buttonText: node.mainDashonicTabsConfig[0]?.buttonText,
      buttonIcon: node.mainDashonicTabsConfig[0]?.buttonIcon,
      buttonColor: node.mainDashonicTabsConfig[0]?.buttonColor,
      tabFormat: node.mainDashonicTabsConfig[0]?.tabFormat,
      nodes: node.mainDashonicTabsConfig[0]?.nodesLength,
    }
  }
  getDropDownAttributeConfig(node: any) {
    return {
      id: node.id as string,
      // className: node.className,
      title: node.dropdownConfig[0]?.title,
      nodes: node.dropdownConfig[0]?.nodes,
      dropdownIcon: node.dropdownConfig[0]?.dropdownIcon,
    }
  }
  getPagesAttributeConfig(node: any) {
    return {
      id: node.id as string,
        // className: node.className,
        title: node.pageConfig[0]?.title,
        Link: node.pageConfig[0]?.link,
    }
  }
  getButtonAttributeConfig(node: any) {
    return {
      id: node.id as string,
      // className: node.className,
      title: node.buttonsConfig[0]?.title,
      link: node.buttonsConfig[0]?.link,
      ButtonIcon: node.buttonsConfig[0]?.ButtonIcon,
    }
  }
}
