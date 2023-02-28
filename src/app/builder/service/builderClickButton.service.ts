import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class BuilderClickButtonService {

  getDrawerConfig(node: any) {
    return { color: node.color, btnText: node.btnText,
       isClosable: node.isClosable, icon: node.icon,
       extra: node.extra, isKeyboard: node.isKeyboard, title: node.title,
        footerText: node.footerText, isVisible: node.isVisible, placement: node.placement,
         width: node.width, height: node.height, offsetX: node.offsetX,
          offsetY: node.offsetY, wrapClassName: node.wrapClassName,
           zIndex: node.zIndex, onClose: node.onClose };
  }

  getSkeletonConfig(node: any) {
    return { size: node.size, buttonShape: node.buttonShape, avatarShape: node.avatarShape };
  }

  getEmptyConfig(node: any) {
    return { text: node.text, icon: node.icon, link: node.link, btnText: node.btnText, color: node.color, content: node.content };
  }
  getlistConfig(node: any) {
    return {
      footerText: node.footerText, formatter: node.formatter, size: node.size, isBordered: node.isBordered,
      isSplit: node.isSplit,
      isEdit: node.isEdit,
      isUpdate: node.isUpdate,
      isDelete: node.isDelete,
      isLoad: node.isLoad,
      loadText: node.loadText,
      options: node.options,
    };
  }
}
