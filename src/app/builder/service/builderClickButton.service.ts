import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class BuilderClickButtonService {

  getDrawerConfig(node: any) {
    return { color: node.color, btnText: node.btnText, isClosable: node.isClosable, icon: node.icon, extra: node.extra, isKeyboard: node.isKeyboard, title: node.title, footerText: node.footerText, isVisible: node.isVisible, placement: node.placement, size: node.size, width: node.width, height: node.height, offsetX: node.offsetX, offsetY: node.offsetY, wrapClassName: node.wrapClassName, zIndex: node.zIndex, onClose: node.onClose, content: node.content, };
  }
  getcardWithComponentsConfig(node: any) {
    return { borderless: node.borderless };
  }
  getIconConfig(node: any) {
    debugger
    return { icon: node.icon, iconType: node.iconType, iconSize: node['iconSize'], iconColor: node['iconColor'] };
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
      iconType: node['iconType'],
      iconSize: node['iconSize'],
      iconColor: node['iconColor'],
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
      isAddRow: node.isAddRow,
      sortOrder: node.sortOrder,
      fixedColumn: node.fixedColumn,
      options: node?.tableHeaders.map((obj: any) => {
        debugger
        return {
          name: obj.name,
          key: obj.key,
          show: obj.show,
          dataType: obj.dataType,
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
      ngvalue: node.ngvalue, options: mappedOptions ,iconType: node['iconType'],iconSize: node['iconSize'], iconColor: node['iconColor'],
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
    return { color: node.color, mode: node.mode, checked: node.checked, options: node.options,
      iconType: node['iconType'],
      iconSize: node['iconSize'],
      iconColor: node['iconColor'],
    };
  }
  getMessageConfig(node: any) {
    return { content: node.content, duration: node.duration, messageType: node.messageType, pauseOnHover: node.pauseOnHover, animate: node.animate };
  }
  getnotificationConfig(node: any) {
    return { content: node.content, icon: node.icon, color: node.color, duration: node.duration, pauseOnHover: node.pauseOnHover, animate: node.animate, notificationType: node.notificationType, placement: node.placement,
      iconType: node['iconType'],
      iconSize: node['iconSize'],
      iconColor: node['iconColor'],
    };
  }
  getStatisticConfig(node: any) {
    return { icon: node.prefixIcon, suffixIcon: node.suffixIcon, options: node.statisticArray, iconType: node['iconType'], iconSize: node['iconSize'], iconColor: node['iconColor'] };
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
      iconType: node['iconType'],
      iconSize: node['iconSize'],
      iconColor: node['iconColor'],
    }
  }
  htmlBlockConfig(node: any) {
    return {
      data: node.data,
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
      iconColor: node['iconColor'],
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
      maxLength: node.maxLength,
      showAddbtn: node.showAddbtn,
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
      iconType: node['iconType'],
      iconSize: node['iconSize'],
      iconColor: node['iconColor'],
    }
  }

  getVideoConfig(node: any) {
    return {
      // videoRatio: node.videoRatio,
      videoSrc: node.videoSrc,
      width: node.width,
      height: node.height,
    }
  }

  getAudioConfig(node: any) {
    return {
      audioSrc: node.audioSrc,
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
      // dotIcon: node.dotIcon,
      labelText: node.labelText,
      // timecolor: node.timecolor,
      position: node.position,
      mode: node.mode,
      mainIcon: node.mainIcon,
      reverse: node.reverse,
      options: node.data,
      // nodes: node['nodes'],
      iconType: node['iconType'],
      iconSize: node['iconSize'],
      iconColor: node['iconColor'],

    }
  }
  getTimelineChildConfig(node: any) {
    return {
      iconType: node['iconType'],
      iconSize: node['iconSize'],
      iconColor: node['iconColor'],
      icon: node['icon'],
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
      footerBorder: node['footerBorder'],
    }
  }
  divConfig(node: any) {
    return {
      divClass: node?.divClass,
      imageSrc: node?.imageSrc,
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
      link: node.link,
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
      heading: node.heading,
      link: node.link,
      iconType: node['iconType'],
      iconSize: node['iconSize'],
      iconColor: node['iconColor'],

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
      addonLeft: node.formly[0].fieldGroup[0].props['additionalProperties']?.addonLeft,
      addonRight: node.formly[0].fieldGroup[0].props['additionalProperties']?.addonRight,
      getVariable: node.formly[0].fieldGroup[0].props['additionalProperties']?.getVariable,
      setVariable: node.formly[0].fieldGroup[0].props['additionalProperties']?.setVariable,
      suffixicon: node.formly[0].fieldGroup[0].props['additionalProperties']?.suffixicon,
      prefixicon: node.formly[0].fieldGroup[0].props['additionalProperties']?.prefixicon,
      maskString: node.formly[0].fieldGroup[0].props?.['maskString'],
      masktitle: node.formly[0].fieldGroup[0].props?.['masktitle'],
      optionWidth: node.formly[0].fieldGroup[0].props['additionalProperties']?.['optionWidth'],
      allowClear: node.formly[0].fieldGroup[0].props['additionalProperties']?.['allowClear'],
      serveSearch: node.formly[0].fieldGroup[0].props['additionalProperties']?.['serveSearch'],
      showArrow: node.formly[0].fieldGroup[0].props['additionalProperties']?.['showArrow'],
      showSearch: node.formly[0].fieldGroup[0].props['additionalProperties']?.['showSearch'],
      removeIcon: node.formly[0].fieldGroup[0].props['additionalProperties']?.['removeIcon'],
      loading: node.formly[0].fieldGroup[0].props['additionalProperties']?.['loading'],
      optionHieght: node.formly[0].fieldGroup[0].props['additionalProperties']?.['optionHieght'],
      optionHoverSize: node.formly[0].fieldGroup[0].props['additionalProperties']?.['optionHoverSize'],
      optionDisabled: node.formly[0].fieldGroup[0].props['additionalProperties']?.['optionDisabled'],
      optionHide: node.formly[0].fieldGroup[0].props['additionalProperties']?.['optionHide'],
      step: node.formly[0].fieldGroup[0].props['additionalProperties']?.['step'],
      format: node.formly[0].fieldGroup[0].props['additionalProperties']?.['format'],
      firstBtnText: node.formly[0].fieldGroup[0].props['additionalProperties']?.['firstBtnText'],
      secondBtnText: node.formly[0].fieldGroup[0].props['additionalProperties']?.['secondBtnText'],
      minuteStep: node.formly[0].fieldGroup[0].props['additionalProperties']?.['minuteStep'],
      secondStep: node.formly[0].fieldGroup[0].props['additionalProperties']?.['secondStep'],
      hoursStep: node.formly[0].fieldGroup[0].props['additionalProperties']?.['hoursStep'],
      icon: node.formly[0].fieldGroup[0].props['additionalProperties']?.['icon'],
      use12Hours: node.formly[0].fieldGroup[0].props['additionalProperties']?.['use12Hours'],
      iconType: node.formly[0].fieldGroup[0].props['additionalProperties']?.['iconType'],
      iconSize: node.formly[0].fieldGroup[0].props['additionalProperties']?.['iconSize'],
      iconColor: node.formly[0].fieldGroup[0].props['additionalProperties']?.['iconColor'],
      border: node.formly[0].fieldGroup[0].props['additionalProperties']?.border,
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
      href: node.href,
      btnType: node.btnType,
      iconType: node['iconType'],
      iconSize: node['iconSize'],
      hoverTextColor: node['hoverTextColor'],
      textColor: node['textColor'],
      isSubmit: node['isSubmit'],
      iconColor: node['iconColor'],
      dataTable: node['dataTable'],
      btnLabelPaddingClass: node['btnLabelPaddingClass'],
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
      iconColor: node['iconColor'],
      dataTable: node['dataTable'],
      btnLabelPaddingClass: node['btnLabelPaddingClass'],
    }
  }
  getAccordionButtonConfig(node: any) {
    return {
      title: node.title,
      nzBordered: node.nzBordered,
      nzGhost: node.nzGhost,
      nzExpandIconPosition: node.nzExpandIconPosition,
      nzDisabled: node.nzDisabled,
      icon: node.nzExpandedIcon,
      nzShowArrow: node.nzShowArrow,
      extra: node.extra,
      iconType: node['iconType'],
      iconSize: node['iconSize'],
      iconColor: node['iconColor'],
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
      iconColor: node['iconColor'],
      dataTable: node['dataTable'],
      btnLabelPaddingClass: node['btnLabelPaddingClass'],
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
    debugger
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
      wrappers: node['wrappers'],
      formatAlignment: node['formatAlignment'],
      // formatAlignment: !node.children?.at(1)?.children[0].formly[0].fieldGroup[0].props['additionalProperties']?.formatAlignment ? 'ltr' : node.children?.at(1)?.children[0].formly[0].fieldGroup[0].props['additionalProperties']?.formatAlignment,
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
      iconColor: node['iconColor'],
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
  getlistWithComponentsConfig(node: any) {
    return {
      nodes: node.nodes,
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
  getBarChartConfig(node: any) {
    return {
      // title: node?.options?.title,
      hAxis: node?.options?.hAxis.title,
      vAxis: node?.options?.vAxis.title,
      color: node?.options?.colors,
      width: node?.width,
      height: node?.height,
      tableData: node?.tableData
      // tableHeaders: node?.tableHeaders
    };
  }
  getPieChartConfig(node: any) {
    return {
      width: node?.width,
      height: node?.height,
      tableData: node?.tableData,
      is3D: node?.options.is3D,
      pieHole: node?.options.pieHole,
      pieStartAngle: node?.options.pieStartAngle,
      // slices: node?.options.slices,
      sliceVisibilityThreshold: node?.options.sliceVisibilityThreshold,
    };
  }
  getBubbleChartConfig(node: any) {
    return {
      width: node?.width,
      height: node?.height,
      fontSize: node?.options?.bubble?.textStyle?.fontSize,
      tableData: node?.tableData
    };
  }
  getCandlestickChartConfig(node: any) {
    debugger
    return {
      width: node?.width,
      height: node?.height,
      tableData: node?.tableData
    };
  }
  getColumnChartConfig(node: any) {
    debugger
    return {
      width: node?.width,
      height: node?.height,
      tableData: node?.tableData,
      groupWidth: node?.options?.bar?.groupWidth,
      position: node?.options?.legend?.position
    };
  }
  getGanttChartConfig(node: any) {
    return {
      isCriticalPath: node?.options?.criticalPathEnabled?.isCriticalPath,
      stroke: node?.options?.criticalPathStyle?.stroke,
      strokeWidth: node?.options?.innerGridHorizLine.strokeWidth,
      color: node?.options?.arrow?.color,
      angle: node?.options?.arrow?.angle,
      arrowWidth: node?.options?.arrow.width,
      radius: node?.options?.arrow?.color?.radius,
      innerGridTrack: node?.options?.innerGridTrack?.fill?.innerGridTrack,
      innerGridDarkTrack: node?.options.innerGridDarkTrack?.fill?.innerGridDarkTrack,
      width: node?.width,
      height: node?.height,
      tableData: node?.tableData
    };
  }
  getGeoChartConfig(node: any) {
    return {
      defaultColor: node?.options.defaultColor,
      color: node?.options.datalessRegionColor,
      bgColor: node?.options.backgroundColor,
      colorAxis: node?.options.colorAxis.colors,
      region: node?.options.region,
      width: node?.width,
      height: node?.height,
      tableData: node?.tableData
    };
  }
  getHistogramChartConfig(node: any) {
    return {
      legend: node?.options.legend,
      color: node?.options.color,
      histogram: node?.options.histogram,
      hAxis: node?.options.hAxis,
      vAxis: node?.options.vAxis,
      width: node?.width,
      height: node?.height,
      tableData: node?.tableData
    };
  }
  gettreeMapChartConfig(node: any) {
    return {
      highlightOnMouseOver: node?.options.highlightOnMouseOver,
      maxDepth: node?.options.maxDepth,
      maxPostDepth: node?.options.maxPostDepth,
      minHighlightColor: node?.options.minHighlightColor,
      midHighlightColor: node?.options.midHighlightColor,
      midColor: node?.options.midColor,
      maxColor: node?.options.maxColor,
      headerHeight: node?.options.headerHeight,
      showScale: node?.options.showScale,
      useWeightedAverageForAggregation: node?.options.useWeightedAverageForAggregation,
      width: node?.width,
      height: node?.height,
      tableData: node?.tableData
    };
  }
  gettableChartConfig(node: any) {
    return {
      tableData: node?.tableData,
      width: node?.width,
      height: node?.height,
    };
  }
  getLineChartConfig(node: any) {
    return {
      subtitle: node?.options?.chart.subtitle,
      width: node?.width,
      height: node?.height,
      tableData: node?.tableData
    };
  }
  getSankeyChartConfig(node: any) {
    return {
      width: node?.width,
      height: node?.height,
      tableData: node?.tableData
    };
  }
  getScatterChartConfig(node: any) {
    return {
      subtitle: node?.options?.chart.subtitle,
      width: node?.width,
      height: node?.height,
      tableData: node?.tableData
    };
  }
  getAreaChartConfig(node: any) {
    return {
      isStacked: node?.options?.isStacked,
      position: node?.options?.legend?.position,
      maxLines: node?.options?.legend?.maxLines,
      selectionMode: node?.options?.selectionMode,
      tooltip: node?.options?.tooltip?.trigger,
      hAxis: node?.options?.hAxis?.title,
      titleTextStyle: node?.options?.hAxis?.titleTextStyle?.color,
      minValue: node?.options?.vAxis?.minValue,
      width: node?.width,
      height: node?.height,
      tableData: node?.tableData
    };
  }
  getComboChartConfig(node: any) {
    return {
      seriesType: node?.options?.seriesType,
      // series: node?.options?.legend?.position,
      hAxis: node?.options?.hAxis?.title,
      vAxis: node?.options?.vAxis?.title,
      width: node?.width,
      height: node?.height,
      tableData: node?.tableData
    };
  }
  getSteppedAreaChartConfig(node: any) {
    return {
      bgColor: node?.options?.backgroundColor,
      position: node?.options?.legend?.position,
      connectSteps: node?.options?.connectSteps,
      color: node?.options?.colors,
      selectionMode: node?.options?.selectionMode,
      isStacked: node?.options?.vAxis?.isStacked,
      width: node?.width,
      height: node?.height,
      tableData: node?.tableData
    };
  }
  getTimelineChartConfig(node: any) {
    return {
      showRowLabels: node?.options?.timeline?.showRowLabels,
      colorByRowLabel: node?.options?.timeline?.colorByRowLabel,
      singleColor: node?.options?.timeline?.singleColor,
      rowLabelFontName: node?.options?.timeline?.rowLabelStyle.fontName,
      rowLabelFontSize: node?.options?.timeline?.rowLabelStyle.fontSize,
      rowLabelColor: node?.options?.timeline?.rowLabelStyle.color,
      barLabelFontName: node?.options?.timeline?.barLabelStyle.fontName,
      barLabelFontSize: node?.options?.timeline?.barLabelStyle.fontSize,
      bgColor: node?.options?.backgroundColor,
      alternatingRowStyle: node?.options?.alternatingRowStyle,
      color: node?.options?.color,
      width: node?.width,
      height: node?.height,
      tableData: node?.tableData
    };
  }
}
