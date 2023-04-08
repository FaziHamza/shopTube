import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class BuilderClickButtonService {

  getDrawerConfig(node: any) {
    return { color: node.color, btnText: node.btnText, isClosable: node.isClosable, icon: node.icon, extra: node.extra, isKeyboard: node.isKeyboard, title: node.title, footerText: node.footerText, isVisible: node.isVisible, placement: node.placement, size: node.size, width: node.width, height: node.height, offsetX: node.offsetX, offsetY: node.offsetY, wrapClassName: node.wrapClassName, zIndex: node.zIndex, onClose: node.onClose, content: node.content, };
  }
  getcardWithComponentsConfig(node: any) {
    return { borderless: node.borderless};
  }
  getIconConfig(node: any) {
    return { icon: node.icon, iconType: node.iconType, iconSize: node['iconSize'] };
  }
  getAnchorConfig(node: any) {
    return { affix: node.affix, offSetTop: node.offSetTop, showInkInFixed: node.showInkInFixed, target: node.target, bond: node.bond };
  }
  getTransferConfig(node: any) {

    return { disabled: node.disabled, showSearch: node.showSearch, firstBoxTitle: node.firstBoxTitle, secondBoxTitle: node.secondBoxTitle, leftButtonLabel: node.leftButtonLabel, rightButtonLabel: node.rightButtonLabel, searchPlaceHolder: node.searchPlaceHolder, status: node.status, notFoundContentLabel: node.notFoundContentLabel, options: node.list };
  }
  getCascaderConfig(node: any) {

    return {
      expandTrigger: node.expandTrigger,
      labelProperty: node.labelProperty,
      placeHolder: node.placeHolder,
      size: node.size,
      status: node.status,
      expandIcon: node.expandIcon,
      suffixIcon: node.suffixIcon,
      allowClear: node.allowClear,
      autoFocus: node.autoFocus,
      backdrop: node.backdrop,
      showArrow: node.showArrow,
      showInput: node.showInput,
      showSearch: node.showSearch,
      disabled: node.disabled,
    };
  }
  getTreeselectviewConfig(node: any) {

    return {
      expandKeys: node.expandKeys,
      showSearch: node.showSearch,
      placeHolder: node.placeHolder,
      disabled: node.disabled,
      icon: node.icon,
      width: node.width,
      hideUnMatched: node.hideUnMatched,
      status: node.status,
      checkable: node.checkable,
      showExpand: node.showExpand,
      showLine: node.showLine,
      defaultExpandAll: node.defaultExpandAll,
      size: node.size,
    };
  }
  getTreeViewConfig(node: any) {

    return {

    };
  }
  progressBarConfig(node: any) {

    return { progressBarType: node.progressBarType, percent: node.percent, showInfo: node.showInfo, status: node.status, strokeLineCap: node.strokeLineCap, success: node.success };
  }
  getGridConfig(node: any) {
    return {
      nzTitle: node.nzTitle,
      nzFooter: node.nzFooter,
      nzPaginationPosition: node.nzPaginationPosition,
      nzPaginationType: node.nzPaginationType,
      nzLoading: node.nzLoading,
      nzShowPagination: node.nzShowPagination,
      nzBordered: node.nzBordered,
      showColumnHeader: node.showColumnHeader,
      noResult: node.noResult,
      nzSimple: node.nzSimple,
      nzSize: node.nzSize,
      nzShowSizeChanger: node.nzShowSizeChanger,
      showCheckbox: node.showCheckbox,
      expandable: node.expandable,
      tableScroll: node.tableScroll,
      fixHeader: node.fixHeader,
      sortDirections: node.sortDirections ? JSON.stringify(node.sortDirections) : node.sortDirections,
      filterMultiple: node.filterMultiple,
      sortOrder: node.sortOrder,
      fixedColumn: node.fixedColumn,
      options: node?.tableHeaders.map((obj: any) => {
        return {
          name: obj.name,
          key: obj.key,
          show: obj.show,
          sum: obj.sum,
          headerButton: '',
          footerButton: '',
          listOfFilter: obj.listOfFilter ? JSON.stringify(obj.listOfFilter) : obj.listOfFilter,
          id: 0,
        };
      }),
    };
  }
  getCommentConfig(node: any) {
    return { avatar: node.avatar, author: node.author };
  }
  getRateFieldsConfig(node: any) {
    
    const mappedOptions = node.options.map((option: any) => ({ label: option }));
    return {
      clear: node.clear, author: node.author, allowHalf: node.allowHalf, focus: node.focus, icon: node.icon, showCount: node.showCount, disabled: node.disabled,
      ngvalue: node.ngvalue, options: mappedOptions
    };
  }

  getSkeletonConfig(node: any) {
    return { size: node.size, buttonShape: node.buttonShape, avatarShape: node.avatarShape, shapeType: node.shapeType, isActive: node.isActive };
  }
  getBadgeConfig(node: any) {
    return {
      count: node.count, nzText: node.nzText, nzColor: node.nzColor, nzStatus: node.nzStatus,
      standAlone: node.standAlone,
      dot: node.dot,
      title: node.title,
      showDot: node.showDot,
      overflowCount: node.overflowCount,
      showZero: node.showZero,
      size: node.size,
      nztype: node.nztype,
      status: node.status,
      icon: node.icon,
      offset: node.offset,
    };
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
    return { color: node.color, mode: node.mode, checked: node.checked, options: node.options };
  }
  getMessageConfig(node: any) {
    return { content: node.content, duration: node.duration, messageType: node.messageType, pauseOnHover: node.pauseOnHover, animate: node.animate };
  }
  getnotificationConfig(node: any) {
    return { content: node.content, icon: node.icon, color: node.color, duration: node.duration, pauseOnHover: node.pauseOnHover, animate: node.animate, notificationType: node.notificationType, placement: node.placement };
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
      btnText: node.btnText,
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
      expand: node.expand,
      showLine: node.showLine,
      blockNode: node.blockNode,
      showIcon: node.showIcon,
      nodes: node.nodes,
      draggable: node.draggable,
      multiple: node.multiple,
      expandAll: node.expandAll,
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
      size: node.size,
      shape: node.shape,
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
      icon: node.icon,
      extra: node.extra,

    }
  }

  getSpinConfig(node: any) {
    return {
      simple: node.simple,
      spinning: node.spinning,
      size: node.size,
      delayTime: node.delayTime,
      loaderText: node.loaderText,
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
      keyboardKey: node.keyboardKey,
      zoom: node.zoom,
      rotate: node.rotate,
      zIndex: node.zIndex,
      imagePreview: node.imagePreview,
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

  getCalenderConfig(node: any) {
    return {
      options: node.options,
      viewType: node.viewType,
      view: node.view,
      weekends: node.weekends,
      editable: node.editable,
      selectable: node.selectable,
      selectMirror: node.selectMirror,
      dayMaxEvents: node.dayMaxEvents,
      details: node.details,
      // disabled: node.disabled,
    }
  }

  getMultiFileUploadConfig(node: any) {
    return {
      multiple: node.multiple,
      disabled: node.disabled,
      uploadBtnLabel: node.uploadBtnLabel,
      uploadLimit: node.uploadLimit,
      size: node.size,
      showDialogueBox: node.showDialogueBox,
      showUploadlist: node.showUploadlist,
      onlyDirectoriesAllow: node.onlyDirectoriesAllow,
    }
  }

  getTextEditorConfig(node: any) {
    return {
    }
  }

  getSwitchConfig(node: any) {
    return {
      // switchType: node.switchType,
      // switchPosition: node.switchPosition,
      size: node.size,
      checkedChildren: node.checkedChildren,
      unCheckedChildren: node.unCheckedChildren,
      disabled: node.disabled,
      loading: node.loading,
      control: node.control,
      model: node.model,
    }
  }

  getTabsConfig(node: any) {
    return {
      icon: node.icon,
      iconType: node['iconType'],
      iconSize: node['iconSize'],
      tooltip: node.tooltip,
      disabled: node.disabled,
    }
  }
  getMenutab(node: any) {
    return {
      icon: node.icon,
      link: node.link,
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
      orientation: node.orientation,
      dividerFormat: node.dividerFormat,
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
      timecolor: node.timecolor,
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
      borderless: node.borderless,
      extra: node.extra,
      hover: node.hover,
      loading: node.loading,
      nztype: node.nztype,
      size: node.size,
      imageAlt: node.imageAlt,
      imageSrc: node.imageSrc,
      description: node.description,
      // bgColorHeader: node.bgColorHeader,
      // bgColorBody: node.bgColorBody,
      // bgColorFooter: node.bgColorFooter,
      bgColor: node.bgColor,
      footer: node.footer,
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

    return {
      // padding: '',
      level: node.level,
      text: node.text,
      style: node.style,
      textAlign: node.textAlign,
      fontstyle: node.fontstyle,
      color: node.color,
      heading: node.heading,
    }
  }

  getParagraphConfig(node: any) {
    return {
      editable: node.editable,
      text: node.text,
      editableTooltip: node.editableTooltip,
      copyable: node.copyable,
      copyTooltips: node.copyTooltips,
      ellipsis: node.ellipsis,
      suffix: node.suffix,
      disabled: node.disabled,
      expandable: node.expandable,
      ellipsisRows: node.ellipsisRows,
      nztype: node.nztype,
      beforecopyIcon: node.beforecopyIcon,
      aftercopyIcon: node.aftercopyIcon,
      editableIcon: node.editableIcon,
      color: node.color,
      fontstyle: node.fontstyle,
    }
  }

  getFormlyConfig(node: any) {

    return {
      key: node.formly[0].fieldGroup[0].key,
      placeholder: node.formly[0].fieldGroup[0].props?.placeholder,
      maxLength: node.formly[0].fieldGroup[0].props?.maxLength,
      minLength: node.formly[0].fieldGroup[0].props?.minLength,
      defaultValue: node.formly[0].fieldGroup[0].defaultValue,
      options: node.formly[0].fieldGroup[0].props?.options,
      required: node.formly[0].fieldGroup[0].props?.required,
      tooltip: node.formly[0].fieldGroup[0].props?.tooltip,
      titleIcon: node.formly[0].fieldGroup[0].props?.['titleIcon'],
      rows: node.formly[0].fieldGroup[0].props?.rows,
      formCheck: node.formly[0].fieldGroup[0].props?.['formCheck'],
      addonLeft: node.formly[0].fieldGroup[0].props.config.addonLeft,
      addonRight: node.formly[0].fieldGroup[0].props.config.addonRight,
      getVariable: node.formly[0].fieldGroup[0].props.config?.getVariable,
      setVariable: node.formly[0].fieldGroup[0].props.config?.setVariable,
      suffixicon: node.formly[0].fieldGroup[0].props.config.suffixicon,
      prefixicon: node.formly[0].fieldGroup[0].props.config.prefixicon,
      optionWidth: node.formly[0].fieldGroup[0].props.config?.['optionWidth'],
      allowClear: node.formly[0].fieldGroup[0].props.config?.['allowClear'],
      serveSearch: node.formly[0].fieldGroup[0].props.config?.['serveSearch'],
      showArrow: node.formly[0].fieldGroup[0].props.config?.['showArrow'],
      showSearch: node.formly[0].fieldGroup[0].props.config?.['showSearch'],
      removeIcon: node.formly[0].fieldGroup[0].props.config?.['removeIcon'],
      loading: node.formly[0].fieldGroup[0].props.config?.['loading'],
      optionHieght: node.formly[0].fieldGroup[0].props.config?.['optionHieght'],
      optionHoverSize: node.formly[0].fieldGroup[0].props.config?.['optionHoverSize'],
      optionDisabled: node.formly[0].fieldGroup[0].props.config?.['optionDisabled'],
      optionHide: node.formly[0].fieldGroup[0].props.config?.['optionHide'],
      step: node.formly[0].fieldGroup[0].props.config?.['step'],
      format: node.formly[0].fieldGroup[0].props.config?.['format'],
      firstBtnText: node.formly[0].fieldGroup[0].props.config?.['firstBtnText'],
      secondBtnText: node.formly[0].fieldGroup[0].props.config?.['secondBtnText'],
      minuteStep: node.formly[0].fieldGroup[0].props.config?.['minuteStep'],
      secondStep: node.formly[0].fieldGroup[0].props.config?.['secondStep'],
      hoursStep: node.formly[0].fieldGroup[0].props.config?.['hoursStep'],
      icon: node.formly[0].fieldGroup[0].props.config?.['icon'],
      use12Hours: node.formly[0].fieldGroup[0].props.config?.['use12Hours'],
      border: node.formly[0].fieldGroup[0].props.config.border,
      disabled: node.formly[0].fieldGroup[0].props?.disabled,
      readonly: node.formly[0].fieldGroup[0].props?.readonly,
      // hideExpression: node.formly[0].fieldGroup[0].props?.hideExpression,
      hideExpression: node['hideExpression'],
    }
  }
  getMaskingFormlyConfig(node: any) {
    return {
      key: node.formly[0].fieldGroup[0].key,
      focus: node.formly[0].fieldGroup[0].focus,
      defaultValue: node.formly[0].fieldGroup[0].defaultValue,
      title: node.formly[0].fieldGroup[0].props?.label,
      required: node.formly[0].fieldGroup[0].props?.required,
      readonly: node.formly[0].fieldGroup[0].props?.readonly,
      disabled: node.formly[0].fieldGroup[0].props?.disabled,
      maskString: node.formly[0].fieldGroup[0].props?.['maskString'],
      masktitle: node.formly[0].fieldGroup[0].props?.['masktitle'],
      placeholder: node.formly[0].fieldGroup[0].props?.placeholder,
      titleIcon: node.formly[0].fieldGroup[0].props?.['labelIcon'],
      addonLeft: node.formly[0].fieldGroup[0].props.addonLeft,
      addonRight: node.formly[0].fieldGroup[0].props.addonRight,
    }
  }
  getButtonConfig(node: any) {

    return {
      color: node.color,
      hoverColor: node.hoverColor,
      title: node.title,
      hideExpression: node.hideExpression,
      format: node.format,
      disabled: node.disabled,
      icon: node.btnIcon,
      tooltip: node.tooltip,
      nzBlock: node.nzBlock,
      nzSize: node.nzSize,
      nzShape: node.nzShape,
      nzLoading: node.nzLoading,
      nzGhost: node.nzGhost,
      nzDanger: node.nzDanger,
      nztype: node.nztype,
      iconType: node['iconType'],
      iconSize: node['iconSize'],
      hoverTextColor: node['hoverTextColor'],
      textColor: node['textColor'],
      isSubmit: node['isSubmit'],
    }
  }
  getDropdownButtonConfig(node: any) {

    return {
      color: node.color,
      onhover: node.onhover,
      hoverColor: node.hoverColor,
      hideExpression: node.hideExpression,
      options: node.dropdownOptions,
      format: node.format,
      tooltip: node.tooltip,
      icon: node.btnIcon,
      disabled: node.disabled,
      nzGhost: node.nzGhost,
      nzLoading: node.nzLoading,
      nzShape: node.nzShape,
      nzSize: node.nzSize,
      nzBlock: node.nzBlock,
      nzDanger: node.nzDanger,
      trigger: node.trigger,
      placement: node.placement,
      visible: node.visible,
      clickHide: node.clickHide,
      iconType: node['iconType'],
      nztype: node['nztype'],
      textColor: node['textColor'],
      iconSize: node['iconSize'],
      hoverTextColor: node['hoverTextColor'],
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
      extra: node.extra,
    }
  }
  getLinkButtonConfig(node: any) {
    return {
      color: node.color,
      onhover: node.onhover,
      hideExpression: node.hideExpression,
      tooltip: node.tooltip,
      href: node.href,
      target: node.target,
      format: node.format,
      btnType: node.btnType,
      icon: node.btnIcon,
      disabled: node.disabled,
      nzGhost: node.nzGhost,
      nzLoading: node.nzLoading,
      nzShape: node.nzShape,
      nzSize: node.nzSize,
      nzBlock: node.nzBlock,
      nzDanger: node.nzDanger,
      iconType: node['iconType'],
      iconSize: node['iconSize'],
    }
  }
  getBtnGroupConfig(node: any) {
    return {
      btngroupformat: node.btngroupformat,
    }
  }
  getPagesConfig(node: any) {
    return {
      options: node?.options
    }
  }
  getHeaderConfig(node: any) {
    return {
      headingSize: node.headingSize,
      header: node.header,
      labelPosition: node.labelPosition,
      alertPosition: node.alertPosition,
      isBordered: node.isBordered,
    }
  }
  getFooterConfig(node: any) {
    return {
      footer: node.footer,
    }
  }
  getSectionConfig(node: any) {
    
    if (node.children[1].children.length > 0) {
      if (node.children[1].children[0].formly) {
        return {
          title: node.title,
          disabled: node.sectionDisabled,
          borderColor: node.borderColor,
          className: node.className,
          labelPosition: node.labelPosition,
          repeatable: node.repeatable,
          size: node.size,
          status: node.status,
          sectionClassName: node.sectionClassName,
          isBordered: node.isBordered,
          wrappers: node.children?.at(1)?.children[0].formly[0].fieldGroup[0].wrappers == undefined ? "" : node.children?.at(1)?.children[0].formly[0].fieldGroup[0].wrappers?.at(0),
          formatAlignment: !node.children?.at(1)?.children[0].formly[0].fieldGroup[0].props.config.formatAlignment ? 'ltr' : node.children?.at(1)?.children[0].formly[0].fieldGroup[0].props.config.formatAlignment,
        }
      }
      else {
        return {
          title: node.title,
          disabled: node.sectionDisabled,
          className: node.className,
          borderColor: node.borderColor,
          titlePosition: node.labelPosition,
          repeatable: node.repeatable,
          isBordered: node.isBordered,
        }
      }
    } else {
      return {
        title: node.title,
        disabled: node.sectionDisabled,
        className: node.className,
        borderColor: node.borderColor,
        titlePosition: node.labelPosition,
        repeatable: node.repeatable,
        isBordered: node.isBordered,
      }
    }
  }
  getSectionFooterConfig(node: any) {
    return {
      footer: node.footer,
      // borderColor: node.borderColor,
      backGroundColor: node.backGroundColor,
      textColor: node.textColor,
    }
  }
  getSectionBodyConfig(node: any) {
    return {
      // borderColor: node.borderColor,
      backGroundColor: node.backGroundColor,
      textColor: node.textColor,
    }
  }
  getSectionHeaderConfig(node: any) {
    return {
      headingSize: node.headingSize,
      header: node.header,
      expanded: node.expanded,
      titlePosition: node.labelPosition,
      // borderColor: node.borderColor,
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
      iconType: node['iconType'],
      iconSize: node['iconSize'],
      // percentage: node.percentage,
    }
  }
  getStepperMainConfig(node: any) {
    return {
      // selectedIndex: node.selectedIndex,
      direction: node.direction,
      placement: node.placement,
      size: node.size,
      // status: node.status,
      disabled: node.disabled,
      nodes: node.nodes,
      stepperType: node.stepperType,
    }
  }
  getMainTabsConfig(node: any) {
    return {
      className: node.className,
      steppertitle: node.formly[0].fieldGroup[0].props?.label,
      stepperFormat: node.formly[0].fieldGroup[0].props?.['stepperFormat'],
      buttonText: node.formly[0].fieldGroup[0].props?.['buttonText'],
      buttonIcon: node.formly[0].fieldGroup[0].props?.['buttonIcon'],
      buttonColor: node.formly[0].fieldGroup[0].props?.['buttonColor'],
      tabsPosition: node.formly[0].fieldGroup[0].props?.['tabsPosition'],
      selectTabColor: node.formly[0].fieldGroup[0].props?.['selectTabColor'],
      tabsDisplayType: node.formly[0].fieldGroup[0].props?.['tabsDisplayType'],
    }
  }
  // Menu builder Click Button

  getMenuAttributeConfig(node: any) {
    return {
      icon: node.icon,
      link: node.link,
      isTitle: node.isTitle,
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
      nodes: node.nodes,
      icon: node.icon,
    }
  }
  getPagesAttributeConfig(node: any) {
    return {
      title: node.title,
      link: node.link,
    }
  }
  getButtonAttributeConfig(node: any) {
    return {
      link: node.link,
      icon: node.icon,
    }
  }
}
