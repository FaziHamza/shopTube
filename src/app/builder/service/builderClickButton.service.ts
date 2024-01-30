import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class BuilderClickButtonService {

  getTransferConfig(node: any) {
    return { options: node.list };
  }

  getGridConfig(node: any) {
    return {
      rowClickApi: node.rowClickApi,
      doubleClick: node.doubleClick,
      sortDirections: node.sortDirections ? JSON.stringify(node.sortDirections) : node.sortDirections,
      options: (node?.tableHeaders || []).map((obj: any) => {
        return {
          name: obj.name,
          key: obj.key,
          srNo: obj.srNo,
          show: ['yes', '', undefined, 'Yes', true].includes(obj.show) ? true : false,
          dataType: obj.dataType,
          editMode: ['yes', 'Yes', true].includes(obj.editMode) ? true : false,
          callApi: obj?.callApi ? obj?.callApi : '',
          sum: obj.sum === true,
          isAllowGrouping: ['yes', true].includes(obj.isAllowGrouping) ? true : false,
          headerButton: '',
          footerButton: '',
          listOfFilter: obj.listOfFilter ? JSON.stringify(obj.listOfFilter) : obj.listOfFilter,
          columnClickApi: obj.columnClickApi,
          position: obj.position,
          width: obj.width,
          icon: obj.icon,
          filtering: obj.filtering ? obj.filtering : false,
          sorting: obj.sorting ? obj.sorting : false,
          multipleFiltering: obj.multipleFiltering ? obj.multipleFiltering : false,
          position_list: [
            {
              label: 'Left',
              value: 'left'
            },
            {
              label: 'Center',
              value: 'center'
            },
            {
              label: 'Right',
              value: 'right'
            }
          ],
          // apiName: obj.apiName ? obj.apiName : '',
        };
      })

    };
  }
  getTaskManagerConfig(node: any) {
    return {
      rowClickApi: node.rowClickApi,
      doubleClick: node.doubleClick,
      sortDirections: node.sortDirections ? JSON.stringify(node.sortDirections) : node.sortDirections,
      options: (node?.tableHeaders || []).map((obj: any) => {
        return {
          name: obj.name,
          key: obj.key,
          srNo: obj.srNo,
          show: ['yes', '', undefined, 'Yes', true].includes(obj.show) ? true : false,
          drawer: [undefined].includes(obj.drawer) ? false : obj?.drawer,
          dataType: obj.dataType,
          editMode: ['yes', 'Yes', true].includes(obj.editMode) ? true : false,
          callApi: obj?.callApi ? obj?.callApi : '',
          position: obj.position,
          width: obj.width,
          icon: obj.icon,
          position_list: [
            {
              label: 'Left',
              value: 'left'
            },
            {
              label: 'Center',
              value: 'center'
            },
            {
              label: 'Right',
              value: 'right'
            }
          ],
        };
      })

    };
  }
  // kanbanFields(node: any) {
  //   return {
  //     options: (node?.kanlistArray || []).map((obj: any) => {
  //       return {
  //         key: obj,
  //         isShow: true,
  //       };
  //     })

  //   };
  // }
  getRateFieldsConfig(node: any) {
    // const mappedOptions = node.options.map((option: any) => ({ label: option }));
    // return {
    //   options: mappedOptions
    // };
  }
  getStatisticConfig(node: any) {
    return { options: node.statisticArray };
  }

  getinvoiceConfig(node: any) {
    return {
      invoiceNumbertitle: node.invoiceNumberLabel,
      datetitle: node.datelabel,
      paymentTermstitle: node.paymentTermsLabel,
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
  getcarouselCrossfadeConfig(node: any) {
    return {
      options: node.carousalConfig,
    }
  }
  getFormlyConfig(node: any) {

    return {
      apiUrl: node.apiUrl,
      key: node.formly[0].fieldGroup[0].key,
      placeholder: node.formly[0].fieldGroup[0].props?.placeholder,
      maxLength: node.formly[0].fieldGroup[0].props?.maxLength,
      minLength: node.formly[0].fieldGroup[0].props?.minLength,
      defaultValue: node.formly[0].fieldGroup[0].defaultValue,
      options: node.formly[0].fieldGroup[0].props?.options,
      required: node.formly[0].fieldGroup[0].props?.required,
      // tooltip: node.formly[0].fieldGroup[0].props?.tooltip,
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
      hoverIconColor: node.formly[0].fieldGroup[0].props['additionalProperties']?.hoverIconColor,
      toolTipClass: node.formly[0].fieldGroup[0].props['additionalProperties']?.toolTipClass,
      tooltipPosition: node.formly[0].fieldGroup[0].props['additionalProperties']?.tooltipPosition,
      tooltip: node.formly[0].fieldGroup[0].props['additionalProperties']['tooltip'],
      classesArray: node.formly[0].fieldGroup[0].props['additionalProperties']['classesArray'],
      selectType: node.formly[0].fieldGroup[0].props['additionalProperties']['selectType'],
      formlyTypes: node.formly[0].fieldGroup[0].props['additionalProperties']['formlyTypes'],
      multiple: node.formly[0].fieldGroup[0].props['additionalProperties']['multiple'],
      uploadBtnLabel: node.formly[0].fieldGroup[0].props['additionalProperties']['uploadBtnLabel'],
      showDialogueBox: node.formly[0].fieldGroup[0].props['additionalProperties']['showDialogueBox'],
      showUploadlist: node.formly[0].fieldGroup[0].props['additionalProperties']['showUploadlist'],
      onlyDirectoriesAllow: node.formly[0].fieldGroup[0].props['additionalProperties']['onlyDirectoriesAllow'],
      uploadLimit: node.formly[0].fieldGroup[0].props['additionalProperties']['uploadLimit'],
      uploadSelectType: node.formly[0].fieldGroup[0].props['additionalProperties']['uploadSelectType'],
      multiFileUploadTypes: node.formly[0].fieldGroup[0].props['additionalProperties']['multiFileUploadTypes'],
      fileUploadSize: node.formly[0].fieldGroup[0].props['additionalProperties']['fileUploadSize'],
      innerInputClass: node.formly[0].fieldGroup[0].props['additionalProperties']['innerInputClass'],
      InputGroupClass: node.formly[0].fieldGroup[0].props['additionalProperties']['InputGroupClass'],
      dataClassification: node.formly[0].fieldGroup[0].props['additionalProperties']['dataClassification'],
      disabledCalenderProperties: node.formly[0].fieldGroup[0].props['additionalProperties']['disabledCalenderProperties'],
      filetype: node.formly[0].fieldGroup[0].props['additionalProperties']['filetype'],
      browserButtonColor: node.formly[0].fieldGroup[0].props['additionalProperties']['browserButtonColor'],
      hoverBrowseButtonColor: node.formly[0].fieldGroup[0].props['additionalProperties']['hoverBrowseButtonColor'],
      applicationThemeClasses: node.formly[0].fieldGroup[0].props['additionalProperties']['applicationThemeClasses'],
      wrapperLabelClass: node.formly[0].fieldGroup[0].props['additionalProperties']['wrapperLabelClass'],
      wrapperInputClass: node.formly[0].fieldGroup[0].props['additionalProperties']['wrapperInputClass'],
      showAddButton: node.formly[0].fieldGroup[0].props['additionalProperties']['showAddButton'],
      signatureAddButtonClass: node.formly[0].fieldGroup[0].props['additionalProperties']['signatureAddButtonClass'],
      signatureClearButtonClass: node.formly[0].fieldGroup[0].props['additionalProperties']['signatureClearButtonClass'],
      height: node.formly[0].fieldGroup[0].props['additionalProperties']['height'],
      disabled: node.formly[0].fieldGroup[0].props?.disabled,
      readonly: node.formly[0].fieldGroup[0].props?.readonly,
      // hideExpression: node.formly[0].fieldGroup[0].props?.hideExpression,
    }
  }
  getDropdownButtonConfig(node: any) {
    return {
      icon: node.btnIcon,
      options: node.dropdownOptions,
    }
  }
  getMainTabsConfig(node: any) {
    return {
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
      iconType: node['iconType'],
      iconSize: node['iconSize'],
      iconColor: node['iconColor'],
      tooltip : node['tooltip'],
      hideExpression : node['hideExpression'],
      iconRight : node['iconRight'],
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
      subtitle: node?.options?.chart.subtitle,
      hAxisTitle: node?.options?.hAxis.title,
      vAxisTitle: node?.options?.vAxis.title,
      groupWidth: node?.options?.bar?.groupWidth,
      isStacked: node?.options?.isStacked,
      barType: node?.options?.bars,
      color: node?.options?.colors,
      columnNames: node?.columnNames.filter((element: any) => typeof element === 'string'),
    };
  }
  getPieChartConfig(node: any) {
    return {
      is3D: node?.options.is3D,
      pieHole: node?.options.pieHole,
      pieStartAngle: node?.options.pieStartAngle,
      // slices: node?.options.slices,
      sliceVisibilityThreshold: node?.options.sliceVisibilityThreshold,
    };
  }
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
  getMenutab(node: any) {
    return {
      icon: node.icon,
      link: node.link,
    }
  }
  getBubbleChartConfig(node: any) {
    return {
      hAxisTitle: node?.options?.hAxis.title,
      vAxisTitle: node?.options?.vAxis.title,
      colorAxis: node?.options?.colorAxis?.colors,
      fontSize: node?.options?.bubble?.textStyle?.fontSize,
      fontName: node?.options?.bubble?.textStyle?.fontName,
      color: node?.options?.bubble?.textStyle?.color,
      bold: node?.options?.bubble?.textStyle?.bold,
      italic: node?.options?.bubble?.textStyle?.italic,
      columnNames: node?.columnNames.filter((element: any) => typeof element === 'string'),
    };
  }
  getColumnChartConfig(node: any) {
    return {
      hAxisTitle: node?.options?.hAxis?.title,
      vAxisTitle: node?.options?.vAxis?.title,
      groupWidth: node?.options?.bar?.groupWidth,
      position: node?.options?.legend?.position,
      maxLines: node?.options?.legend?.maxLines,
      isStacked: node?.options?.isStacked,
      color: node?.options?.colors,
      columnNames: node?.columnNames.filter((element: any) => typeof element === 'string'),
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
    };
  }
  getGeoChartConfig(node: any) {
    return {
      defaultColor: node?.options.defaultColor,
      color: node?.options.datalessRegionColor,
      bgColor: node?.options.backgroundColor,
      colorAxis: node?.options.colorAxis.colors,
      region: node?.options.region,
    };
  }
  getHistogramChartConfig(node: any) {
    return {
      legend: node?.options.legend,
      color: node?.options.color,
      histogram: node?.options.histogram,
      hAxis: node?.options.hAxis,
      vAxis: node?.options.vAxis,
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
    };
  }

  getLineChartConfig(node: any) {
    return {
      subtitle: node?.options?.chart.subtitle,
    };
  }
  getScatterChartConfig(node: any) {
    return {
      subtitle: node?.options?.chart.subtitle,
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
    };
  }
  getComboChartConfig(node: any) {
    return {
      seriesType: node?.options?.seriesType,
      hAxis: node?.options?.hAxis?.title,
      vAxis: node?.options?.vAxis?.title,
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
    };
  }
  getSectionConfig(node: any) {
    return {
      title: node.title,
      disabled: node.sectionDisabled,
      borderColor: node.borderColor,
      // className: node.className,
      labelPosition: node.labelPosition,
      repeatable: node.repeatable,
      size: node.size,
      status: node.status,
      sectionClassName: node.sectionClassName,
      isBordered: node.isBordered,
      wrappers: node['wrappers'],
      formatAlignment: node['formatAlignment'],
      mapApi: node['mapApi'],
      tableHeader: node['tableHeader'],
      tableBody: node['tableBody'],
      checkDatas: node['checkDatas'],
      dbData: node['dbData'],
      tableData: node['tableData'],
      borderRadius: node['borderRadius'],
      rowClass: node['rowClass'],
      borderLessInputs: node['borderLessInputs'],
      inputLabelClassName: node['inputLabelClassName'],
      // formatAlignment: !node.children?.at(1)?.children[0].formly[0].fieldGroup[0].props['additionalProperties']?.formatAlignment ? 'ltr' : node.children?.at(1)?.children[0].formly[0].fieldGroup[0].props['additionalProperties']?.formatAlignment,
    }
  }
  getButtonConfig(node: any) {
    return {
      icon: node.btnIcon,
    }
  }

  getLinkButtonConfig(node: any) {
    return {
      icon: node.btnIcon,
    }
  }
  headerConfig(node: any) {
    return {
      headerCollapse: node.expand ? node.expand : node.headerCollapse,
      expandedIconPosition: node.expandedIconPosition,
      headingSize: node.headingSize,
      backGroundColor: node.backGroundColor,
      textColor: node.textColor,
      header: node.header,
      title: node.title,
    }
  }
}
