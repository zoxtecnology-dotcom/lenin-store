import { N as jsxRuntimeExports, Y as reactExports, R as React } from "./_ssr/index.mjs";
import { f as Route$m, V as useCart, y as fmtCOP, A as ArrowRight, a1 as useWishlist, L as Link, M as Minus, P as Plus, x as createLucideIcon, t as cn, C as ChevronDown, Y as useControllableState, Z as useId, b as Primitive, w as createContextScope, W as useComposedRefs, u as composeEventHandlers, a as Presence, _ as useLayoutEffect2, v as composeRefs } from "./_ssr/router-Cd0oBxWL.mjs";
import { S as SiteHeader, F as Footer, H as Heart } from "./_ssr/Footer-CbOX52zc.mjs";
import { S as SizeGuideModal } from "./_ssr/SizeGuideModal-CAP3KUJt.mjs";
import { P as Package } from "./_ssr/package-Dl87lcow.mjs";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_ssr/index-0g9BxVXQ.mjs";
import "./_ssr/menu-BYb1-akj.mjs";
import "./_ssr/user-vzxeEXK0.mjs";
import "./_ssr/shopping-bag-6dSKfxZg.mjs";
import "./_ssr/size-guides-BTy17x57.mjs";
import "./_ssr/loader-bWMdxCq7.mjs";
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode);
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = reactExports.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = reactExports.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (reactExports.Children.count(newElement) > 1) return reactExports.Children.only(null);
          return reactExports.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: reactExports.isValidElement(newElement) ? reactExports.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = reactExports.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    if (reactExports.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== reactExports.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return reactExports.cloneElement(children, props2);
    }
    return reactExports.Children.count(children) > 1 ? reactExports.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = /* @__PURE__ */ Symbol("radix.slottable");
function isSlottable(child) {
  return reactExports.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
function createCollection(name) {
  const PROVIDER_NAME = name + "CollectionProvider";
  const [createCollectionContext, createCollectionScope2] = createContextScope(PROVIDER_NAME);
  const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(
    PROVIDER_NAME,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  );
  const CollectionProvider = (props) => {
    const { scope, children } = props;
    const ref = React.useRef(null);
    const itemMap = React.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionProviderImpl, { scope, itemMap, collectionRef: ref, children });
  };
  CollectionProvider.displayName = PROVIDER_NAME;
  const COLLECTION_SLOT_NAME = name + "CollectionSlot";
  const CollectionSlotImpl = /* @__PURE__ */ createSlot(COLLECTION_SLOT_NAME);
  const CollectionSlot = React.forwardRef(
    (props, forwardedRef) => {
      const { scope, children } = props;
      const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
      const composedRefs = useComposedRefs(forwardedRef, context.collectionRef);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionSlotImpl, { ref: composedRefs, children });
    }
  );
  CollectionSlot.displayName = COLLECTION_SLOT_NAME;
  const ITEM_SLOT_NAME = name + "CollectionItemSlot";
  const ITEM_DATA_ATTR = "data-radix-collection-item";
  const CollectionItemSlotImpl = /* @__PURE__ */ createSlot(ITEM_SLOT_NAME);
  const CollectionItemSlot = React.forwardRef(
    (props, forwardedRef) => {
      const { scope, children, ...itemData } = props;
      const ref = React.useRef(null);
      const composedRefs = useComposedRefs(forwardedRef, ref);
      const context = useCollectionContext(ITEM_SLOT_NAME, scope);
      React.useEffect(() => {
        context.itemMap.set(ref, { ref, ...itemData });
        return () => void context.itemMap.delete(ref);
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionItemSlotImpl, { ...{ [ITEM_DATA_ATTR]: "" }, ref: composedRefs, children });
    }
  );
  CollectionItemSlot.displayName = ITEM_SLOT_NAME;
  function useCollection2(scope) {
    const context = useCollectionContext(name + "CollectionConsumer", scope);
    const getItems = React.useCallback(() => {
      const collectionNode = context.collectionRef.current;
      if (!collectionNode) return [];
      const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
      const items = Array.from(context.itemMap.values());
      const orderedItems = items.sort(
        (a, b) => orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current)
      );
      return orderedItems;
    }, [context.collectionRef, context.itemMap]);
    return getItems;
  }
  return [
    { Provider: CollectionProvider, Slot: CollectionSlot, ItemSlot: CollectionItemSlot },
    useCollection2,
    createCollectionScope2
  ];
}
var COLLAPSIBLE_NAME = "Collapsible";
var [createCollapsibleContext, createCollapsibleScope] = createContextScope(COLLAPSIBLE_NAME);
var [CollapsibleProvider, useCollapsibleContext] = createCollapsibleContext(COLLAPSIBLE_NAME);
var Collapsible = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCollapsible,
      open: openProp,
      defaultOpen,
      disabled,
      onOpenChange,
      ...collapsibleProps
    } = props;
    const [open, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen ?? false,
      onChange: onOpenChange,
      caller: COLLAPSIBLE_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CollapsibleProvider,
      {
        scope: __scopeCollapsible,
        disabled,
        contentId: useId(),
        open,
        onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            "data-state": getState$1(open),
            "data-disabled": disabled ? "" : void 0,
            ...collapsibleProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Collapsible.displayName = COLLAPSIBLE_NAME;
var TRIGGER_NAME$1 = "CollapsibleTrigger";
var CollapsibleTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCollapsible, ...triggerProps } = props;
    const context = useCollapsibleContext(TRIGGER_NAME$1, __scopeCollapsible);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        "aria-controls": context.contentId,
        "aria-expanded": context.open || false,
        "data-state": getState$1(context.open),
        "data-disabled": context.disabled ? "" : void 0,
        disabled: context.disabled,
        ...triggerProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
  }
);
CollapsibleTrigger.displayName = TRIGGER_NAME$1;
var CONTENT_NAME$1 = "CollapsibleContent";
var CollapsibleContent = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...contentProps } = props;
    const context = useCollapsibleContext(CONTENT_NAME$1, props.__scopeCollapsible);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleContentImpl, { ...contentProps, ref: forwardedRef, present }) });
  }
);
CollapsibleContent.displayName = CONTENT_NAME$1;
var CollapsibleContentImpl = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeCollapsible, present, children, ...contentProps } = props;
  const context = useCollapsibleContext(CONTENT_NAME$1, __scopeCollapsible);
  const [isPresent, setIsPresent] = reactExports.useState(present);
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const heightRef = reactExports.useRef(0);
  const height = heightRef.current;
  const widthRef = reactExports.useRef(0);
  const width = widthRef.current;
  const isOpen = context.open || isPresent;
  const isMountAnimationPreventedRef = reactExports.useRef(isOpen);
  const originalStylesRef = reactExports.useRef(void 0);
  reactExports.useEffect(() => {
    const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
    return () => cancelAnimationFrame(rAF);
  }, []);
  useLayoutEffect2(() => {
    const node = ref.current;
    if (node) {
      originalStylesRef.current = originalStylesRef.current || {
        transitionDuration: node.style.transitionDuration,
        animationName: node.style.animationName
      };
      node.style.transitionDuration = "0s";
      node.style.animationName = "none";
      const rect = node.getBoundingClientRect();
      heightRef.current = rect.height;
      widthRef.current = rect.width;
      if (!isMountAnimationPreventedRef.current) {
        node.style.transitionDuration = originalStylesRef.current.transitionDuration;
        node.style.animationName = originalStylesRef.current.animationName;
      }
      setIsPresent(present);
    }
  }, [context.open, present]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-state": getState$1(context.open),
      "data-disabled": context.disabled ? "" : void 0,
      id: context.contentId,
      hidden: !isOpen,
      ...contentProps,
      ref: composedRefs,
      style: {
        [`--radix-collapsible-content-height`]: height ? `${height}px` : void 0,
        [`--radix-collapsible-content-width`]: width ? `${width}px` : void 0,
        ...props.style
      },
      children: isOpen && children
    }
  );
});
function getState$1(open) {
  return open ? "open" : "closed";
}
var Root = Collapsible;
var Trigger = CollapsibleTrigger;
var Content = CollapsibleContent;
var DirectionContext = reactExports.createContext(void 0);
function useDirection(localDir) {
  const globalDir = reactExports.useContext(DirectionContext);
  return localDir || globalDir || "ltr";
}
var ACCORDION_NAME = "Accordion";
var ACCORDION_KEYS = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
var [Collection, useCollection, createCollectionScope] = createCollection(ACCORDION_NAME);
var [createAccordionContext] = createContextScope(ACCORDION_NAME, [
  createCollectionScope,
  createCollapsibleScope
]);
var useCollapsibleScope = createCollapsibleScope();
var Accordion$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { type, ...accordionProps } = props;
    const singleProps = accordionProps;
    const multipleProps = accordionProps;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeAccordion, children: type === "multiple" ? /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionImplMultiple, { ...multipleProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionImplSingle, { ...singleProps, ref: forwardedRef }) });
  }
);
Accordion$1.displayName = ACCORDION_NAME;
var [AccordionValueProvider, useAccordionValueContext] = createAccordionContext(ACCORDION_NAME);
var [AccordionCollapsibleProvider, useAccordionCollapsibleContext] = createAccordionContext(
  ACCORDION_NAME,
  { collapsible: false }
);
var AccordionImplSingle = React.forwardRef(
  (props, forwardedRef) => {
    const {
      value: valueProp,
      defaultValue,
      onValueChange = () => {
      },
      collapsible = false,
      ...accordionSingleProps
    } = props;
    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue ?? "",
      onChange: onValueChange,
      caller: ACCORDION_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AccordionValueProvider,
      {
        scope: props.__scopeAccordion,
        value: React.useMemo(() => value ? [value] : [], [value]),
        onItemOpen: setValue,
        onItemClose: React.useCallback(() => collapsible && setValue(""), [collapsible, setValue]),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionCollapsibleProvider, { scope: props.__scopeAccordion, collapsible, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionImpl, { ...accordionSingleProps, ref: forwardedRef }) })
      }
    );
  }
);
var AccordionImplMultiple = React.forwardRef((props, forwardedRef) => {
  const {
    value: valueProp,
    defaultValue,
    onValueChange = () => {
    },
    ...accordionMultipleProps
  } = props;
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? [],
    onChange: onValueChange,
    caller: ACCORDION_NAME
  });
  const handleItemOpen = React.useCallback(
    (itemValue) => setValue((prevValue = []) => [...prevValue, itemValue]),
    [setValue]
  );
  const handleItemClose = React.useCallback(
    (itemValue) => setValue((prevValue = []) => prevValue.filter((value2) => value2 !== itemValue)),
    [setValue]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AccordionValueProvider,
    {
      scope: props.__scopeAccordion,
      value,
      onItemOpen: handleItemOpen,
      onItemClose: handleItemClose,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionCollapsibleProvider, { scope: props.__scopeAccordion, collapsible: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionImpl, { ...accordionMultipleProps, ref: forwardedRef }) })
    }
  );
});
var [AccordionImplProvider, useAccordionContext] = createAccordionContext(ACCORDION_NAME);
var AccordionImpl = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, disabled, dir, orientation = "vertical", ...accordionProps } = props;
    const accordionRef = React.useRef(null);
    const composedRefs = useComposedRefs(accordionRef, forwardedRef);
    const getItems = useCollection(__scopeAccordion);
    const direction = useDirection(dir);
    const isDirectionLTR = direction === "ltr";
    const handleKeyDown = composeEventHandlers(props.onKeyDown, (event) => {
      if (!ACCORDION_KEYS.includes(event.key)) return;
      const target = event.target;
      const triggerCollection = getItems().filter((item) => !item.ref.current?.disabled);
      const triggerIndex = triggerCollection.findIndex((item) => item.ref.current === target);
      const triggerCount = triggerCollection.length;
      if (triggerIndex === -1) return;
      event.preventDefault();
      let nextIndex = triggerIndex;
      const homeIndex = 0;
      const endIndex = triggerCount - 1;
      const moveNext = () => {
        nextIndex = triggerIndex + 1;
        if (nextIndex > endIndex) {
          nextIndex = homeIndex;
        }
      };
      const movePrev = () => {
        nextIndex = triggerIndex - 1;
        if (nextIndex < homeIndex) {
          nextIndex = endIndex;
        }
      };
      switch (event.key) {
        case "Home":
          nextIndex = homeIndex;
          break;
        case "End":
          nextIndex = endIndex;
          break;
        case "ArrowRight":
          if (orientation === "horizontal") {
            if (isDirectionLTR) {
              moveNext();
            } else {
              movePrev();
            }
          }
          break;
        case "ArrowDown":
          if (orientation === "vertical") {
            moveNext();
          }
          break;
        case "ArrowLeft":
          if (orientation === "horizontal") {
            if (isDirectionLTR) {
              movePrev();
            } else {
              moveNext();
            }
          }
          break;
        case "ArrowUp":
          if (orientation === "vertical") {
            movePrev();
          }
          break;
      }
      const clampedIndex = nextIndex % triggerCount;
      triggerCollection[clampedIndex].ref.current?.focus();
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AccordionImplProvider,
      {
        scope: __scopeAccordion,
        disabled,
        direction: dir,
        orientation,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: __scopeAccordion, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            ...accordionProps,
            "data-orientation": orientation,
            ref: composedRefs,
            onKeyDown: disabled ? void 0 : handleKeyDown
          }
        ) })
      }
    );
  }
);
var ITEM_NAME = "AccordionItem";
var [AccordionItemProvider, useAccordionItemContext] = createAccordionContext(ITEM_NAME);
var AccordionItem$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, value, ...accordionItemProps } = props;
    const accordionContext = useAccordionContext(ITEM_NAME, __scopeAccordion);
    const valueContext = useAccordionValueContext(ITEM_NAME, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    const triggerId = useId();
    const open = value && valueContext.value.includes(value) || false;
    const disabled = accordionContext.disabled || props.disabled;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AccordionItemProvider,
      {
        scope: __scopeAccordion,
        open,
        disabled,
        triggerId,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Root,
          {
            "data-orientation": accordionContext.orientation,
            "data-state": getState(open),
            ...collapsibleScope,
            ...accordionItemProps,
            ref: forwardedRef,
            disabled,
            open,
            onOpenChange: (open2) => {
              if (open2) {
                valueContext.onItemOpen(value);
              } else {
                valueContext.onItemClose(value);
              }
            }
          }
        )
      }
    );
  }
);
AccordionItem$1.displayName = ITEM_NAME;
var HEADER_NAME = "AccordionHeader";
var AccordionHeader = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, ...headerProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(HEADER_NAME, __scopeAccordion);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.h3,
      {
        "data-orientation": accordionContext.orientation,
        "data-state": getState(itemContext.open),
        "data-disabled": itemContext.disabled ? "" : void 0,
        ...headerProps,
        ref: forwardedRef
      }
    );
  }
);
AccordionHeader.displayName = HEADER_NAME;
var TRIGGER_NAME = "AccordionTrigger";
var AccordionTrigger$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, ...triggerProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(TRIGGER_NAME, __scopeAccordion);
    const collapsibleContext = useAccordionCollapsibleContext(TRIGGER_NAME, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.ItemSlot, { scope: __scopeAccordion, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Trigger,
      {
        "aria-disabled": itemContext.open && !collapsibleContext.collapsible || void 0,
        "data-orientation": accordionContext.orientation,
        id: itemContext.triggerId,
        ...collapsibleScope,
        ...triggerProps,
        ref: forwardedRef
      }
    ) });
  }
);
AccordionTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "AccordionContent";
var AccordionContent$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, ...contentProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(CONTENT_NAME, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content,
      {
        role: "region",
        "aria-labelledby": itemContext.triggerId,
        "data-orientation": accordionContext.orientation,
        ...collapsibleScope,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ["--radix-accordion-content-height"]: "var(--radix-collapsible-content-height)",
          ["--radix-accordion-content-width"]: "var(--radix-collapsible-content-width)",
          ...props.style
        }
      }
    );
  }
);
AccordionContent$1.displayName = CONTENT_NAME;
function getState(open) {
  return open ? "open" : "closed";
}
var Root2 = Accordion$1;
var Item = AccordionItem$1;
var Header = AccordionHeader;
var Trigger2 = AccordionTrigger$1;
var Content2 = AccordionContent$1;
const Accordion = Root2;
const AccordionItem = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Item, { ref, className: cn("border-b", className), ...props }));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { className: "flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Trigger2,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = Trigger2.displayName;
const AccordionContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = Content2.displayName;
function ProductPage() {
  const {
    product,
    settings
  } = Route$m.useLoaderData();
  const isConjunto = product.type === "conjunto" && !!product.conjunto;
  return isConjunto ? /* @__PURE__ */ jsxRuntimeExports.jsx(ConjuntoProductPage, { product, settings }) : /* @__PURE__ */ jsxRuntimeExports.jsx(StandardProductPage, { product, settings });
}
function StandardProductPage({
  product,
  settings
}) {
  const {
    add,
    setOpen
  } = useCart();
  const [activeImage, setActiveImage] = reactExports.useState(0);
  const [selectedColor, setSelectedColor] = reactExports.useState(0);
  const [selectedSize, setSelectedSize] = reactExports.useState(null);
  const [qty, setQty] = reactExports.useState(1);
  const {
    toggle: toggle2,
    has
  } = useWishlist();
  const wishlisted = has(product.slug);
  function handleAddToCart() {
    add({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.front,
      size: selectedSize ?? void 0,
      color: product.colors[selectedColor]?.name
    });
    setOpen(true);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "bg-background text-foreground min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 pt-28 pb-20 md:px-10 md:pt-32", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { category: product.category, name: product.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 mt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Gallery, { images: product.images, active: activeImage, onSelect: setActiveImage }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropWishlist, { drop: product.drop, wishlisted, onWishlist: () => toggle2(product.slug) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(2.4rem,5vw,4rem)] uppercase leading-[0.9] text-cream mb-6", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PriceBlock, { price: product.price, compareAtPrice: product.compareAtPrice }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-cream/70 mb-8", children: product.shortDescription }),
          product.colors.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(ColorPicker, { colors: product.colors, selected: selectedColor, onSelect: setSelectedColor, variants: product.variants ?? [], sizes: product.sizes }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SizePicker, { sizes: product.sizes, selected: selectedSize, onSelect: setSelectedSize, variants: product.variants ?? [], selectedColor: product.colors[selectedColor]?.name ?? "", category: product.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(QtyPicker, { qty, onChange: setQty }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleAddToCart, className: "w-full bg-cream text-ink py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-acid transition-colors duration-300", children: "Añadir al carrito" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "w-full flex items-center justify-center gap-2 border border-cream text-cream py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-cream hover:text-ink transition-colors duration-300", children: [
              "Comprar ya ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 13, strokeWidth: 1.5 })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrustBadges, { settings }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProductAccordion, { product, settings })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RelatedProducts, { currentSlug: product.slug, category: product.category }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function ConjuntoProductPage({
  product,
  settings
}) {
  const {
    add,
    setOpen
  } = useCart();
  const c = product.conjunto;
  const [combo, setCombo] = reactExports.useState("completo");
  const [topSize, setTopSize] = reactExports.useState(null);
  const [bottomSize, setBottomSize] = reactExports.useState(null);
  const [selectedColor, setSelectedColor] = reactExports.useState(0);
  const [wishlisted, setWishlisted] = reactExports.useState(false);
  const [guideOpen, setGuideOpen] = reactExports.useState(false);
  const [guideCategory, setGuideCategory] = reactExports.useState("camiseta");
  const completoImages = [...c.fullImages, ...c.topImages, ...c.bottomImages, ...product.images.filter((img) => !c.fullImages.includes(img) && !c.topImages.includes(img) && !c.bottomImages.includes(img))].filter(Boolean);
  const activeImages = combo === "completo" ? completoImages : combo === "top" ? c.topImages : c.bottomImages;
  const [activeImage, setActiveImage] = reactExports.useState(0);
  reactExports.useEffect(() => {
    setActiveImage(0);
  }, [combo]);
  const activePrice = combo === "completo" ? product.price : combo === "top" ? c.topPrice : c.bottomPrice;
  const activeName = combo === "completo" ? product.name : combo === "top" ? c.topName : c.bottomName;
  const savings = Math.round((1 - product.price / (c.topPrice + c.bottomPrice)) * 100);
  function handleAddToCart() {
    if (combo === "completo") {
      add({
        slug: product.slug + "-completo",
        name: product.name,
        price: product.price,
        image: c.fullImages[0],
        color: product.colors[selectedColor]?.name,
        conjuntoMode: "completo",
        pieces: [{
          name: c.topName,
          size: topSize ?? "?"
        }, {
          name: c.bottomName,
          size: bottomSize ?? "?"
        }]
      });
    } else if (combo === "top") {
      add({
        slug: product.slug + "-top",
        name: c.topName,
        price: c.topPrice,
        image: c.topImages[0],
        size: topSize ?? void 0,
        color: product.colors[selectedColor]?.name,
        conjuntoMode: "top"
      });
    } else {
      add({
        slug: product.slug + "-bottom",
        name: c.bottomName,
        price: c.bottomPrice,
        image: c.bottomImages[0],
        size: bottomSize ?? void 0,
        color: product.colors[selectedColor]?.name,
        conjuntoMode: "bottom"
      });
    }
    setOpen(true);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "bg-background text-foreground min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 pt-28 pb-20 md:px-10 md:pt-32", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { category: product.category, name: product.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 mt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Gallery, { images: activeImages, active: Math.min(activeImage, activeImages.length - 1), onSelect: setActiveImage }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropWishlist, { drop: product.drop, wishlisted, onWishlist: () => toggle(product.slug) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(2.4rem,5vw,4rem)] uppercase leading-[0.9] text-cream mb-6", children: activeName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl text-cream", children: fmtCOP(activePrice) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-[0.22em] text-cream/40 mb-6", children: [
            "6 cuotas de ",
            fmtCOP(Math.round(activePrice / 6)),
            " con Addi / Sistecredito"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-cream/70 mb-8", children: product.shortDescription }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/50 mb-4", children: "Elige tu combo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: [{
              key: "completo",
              label: "Conjunto Completo",
              sub: `${c.topName.split("/")[0].trim()} + ${c.bottomName.split("/")[0].trim()}`,
              price: product.price,
              badge: `Ahorra ${savings}%`,
              img: c.fullImages[0]
            }, {
              key: "top",
              label: c.topName.split("/")[0].trim(),
              sub: "Solo buso",
              price: c.topPrice,
              img: c.topImages[0]
            }, {
              key: "bottom",
              label: c.bottomName.split("/")[0].trim(),
              sub: "Solo pantalón",
              price: c.bottomPrice,
              img: c.bottomImages[0]
            }].map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
              setCombo(opt.key);
              setActiveImage(0);
            }, className: `relative flex flex-col border text-left transition-all duration-200 overflow-hidden ${combo === opt.key ? "border-cream" : "border-border hover:border-cream/40"}`, children: [
              combo === opt.key && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 right-2 w-2.5 h-2.5 bg-acid rounded-full z-10" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square bg-bone relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: opt.img, alt: opt.label, className: "absolute inset-0 w-full h-full object-cover" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-medium uppercase tracking-[0.2em] text-cream leading-tight", children: opt.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-cream/40 uppercase tracking-[0.15em] mt-0.5", children: fmtCOP(opt.price) }),
                "badge" in opt && opt.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 inline-block bg-acid text-ink text-[8px] px-1.5 py-0.5 uppercase tracking-[0.15em] font-medium", children: opt.badge })
              ] })
            ] }, opt.key)) }),
            combo === "completo" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[10px] uppercase tracking-[0.2em] text-acid flex items-center gap-1", children: "✓ Mejor precio" })
          ] }),
          product.colors.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(ColorPicker, { colors: product.colors, selected: selectedColor, onSelect: setSelectedColor }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SizeGuideModal, { open: guideOpen, onClose: () => setGuideOpen(false), category: guideCategory }),
          (combo === "completo" || combo === "top") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/50", children: [
                "Talla — ",
                c.topName
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
                setGuideCategory(c.topPieceType);
                setGuideOpen(true);
              }, className: "text-[10px] uppercase tracking-[0.22em] text-cream/50 hover:text-acid transition-colors flex items-center gap-1", children: [
                "Guía de tallas ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 10, strokeWidth: 1.5 })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: product.sizes.map((size) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTopSize(size), className: `min-w-[44px] px-3 py-2 text-[10px] uppercase tracking-[0.2em] border transition-all ${topSize === size ? "bg-cream text-ink border-cream" : "text-cream/60 border-border hover:border-cream hover:text-cream"}`, children: size }, size)) })
          ] }),
          (combo === "completo" || combo === "bottom") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/50", children: [
                "Talla — ",
                c.bottomName
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
                setGuideCategory(c.bottomPieceType);
                setGuideOpen(true);
              }, className: "text-[10px] uppercase tracking-[0.22em] text-cream/50 hover:text-acid transition-colors flex items-center gap-1", children: [
                "Guía de tallas ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 10, strokeWidth: 1.5 })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: product.sizes.map((size) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setBottomSize(size), className: `min-w-[44px] px-3 py-2 text-[10px] uppercase tracking-[0.2em] border transition-all ${bottomSize === size ? "bg-cream text-ink border-cream" : "text-cream/60 border-border hover:border-cream hover:text-cream"}`, children: size }, size)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleAddToCart, className: "w-full bg-cream text-ink py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-acid transition-colors duration-300", children: combo === "completo" ? "Añadir conjunto al carrito" : combo === "top" ? `Añadir ${c.topName.split("/")[0].trim()} al carrito` : `Añadir ${c.bottomName.split("/")[0].trim()} al carrito` }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "w-full flex items-center justify-center gap-2 border border-cream text-cream py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-cream hover:text-ink transition-colors duration-300", children: [
              "Comprar ya ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 13, strokeWidth: 1.5 })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrustBadges, { settings }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProductAccordion, { product, settings })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RelatedProducts, { currentSlug: product.slug, category: product.category }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
const CATEGORY_HANDLE = {
  Camisetas: "camisetas",
  Gorras: "gorras",
  Busos: "hombre",
  Conjuntos: "hombre",
  Pantalonetas: "hombre",
  Pantalones: "hombre"
};
function Breadcrumb({
  category,
  name
}) {
  const handle = CATEGORY_HANDLE[category] ?? "nuevo";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-cream/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-cream transition-colors", children: "Inicio" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/collections/$handle", params: {
      handle
    }, className: "hover:text-cream transition-colors", children: category }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/80 truncate max-w-[16rem]", children: name })
  ] });
}
function Gallery({
  images,
  active,
  onSelect
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/5] overflow-hidden bg-bone", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: images[active], alt: "", className: "h-full w-full object-cover transition-opacity duration-300" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: images.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onSelect(i), className: `aspect-square overflow-hidden bg-bone border-b-2 transition-colors ${active === i ? "border-cream" : "border-transparent"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: "", className: "h-full w-full object-cover" }) }, i)) })
  ] });
}
function DropWishlist({
  drop,
  wishlisted,
  onWishlist
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.3em] text-acid", children: drop }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onWishlist, "aria-label": "Guardar en wishlist", className: `transition-colors ${wishlisted ? "text-acid" : "text-cream/40 hover:text-cream"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 18, strokeWidth: 1.5, fill: wishlisted ? "currentColor" : "none" }) })
  ] });
}
function PriceBlock({
  price,
  compareAtPrice
}) {
  const discountPct = compareAtPrice && compareAtPrice > price ? Math.round((1 - price / compareAtPrice) * 100) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-baseline gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl text-cream", children: fmtCOP(price) }),
      compareAtPrice && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg text-cream/30 line-through", children: fmtCOP(compareAtPrice) }),
      discountPct && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-acid text-ink text-[10px] px-2 py-0.5 uppercase tracking-[0.15em] font-medium", children: [
        "-",
        discountPct,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-[0.22em] text-cream/40 mb-5", children: [
      "6 cuotas de ",
      fmtCOP(Math.round(price / 6)),
      " con Addi / Sistecredito"
    ] })
  ] });
}
function ColorPicker({
  colors,
  selected,
  onSelect,
  variants,
  sizes
}) {
  function colorStock(colorName) {
    if (!variants.length) return 99;
    return sizes.reduce((sum, s) => sum + variants.filter((v) => v.color_name === colorName && v.size === s && v.piece === null).reduce((a, v) => a + v.stock, 0), 0);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/50", children: "Color" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.22em] text-cream", children: colors[selected].name })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: colors.map((color, i) => {
      const stock = colorStock(color.name);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => stock > 0 && onSelect(i), "aria-label": `${color.name}${stock === 0 ? " — agotado" : ""}`, disabled: stock === 0, className: `w-8 h-8 border-2 transition-all ${selected === i ? "border-cream scale-110" : "border-transparent"} ${stock === 0 ? "opacity-30 cursor-not-allowed" : ""}`, style: {
        backgroundColor: color.swatch
      } }, i);
    }) })
  ] });
}
function SizePicker({
  sizes,
  selected,
  onSelect,
  variants,
  selectedColor,
  category
}) {
  const [guideOpen, setGuideOpen] = reactExports.useState(false);
  const isTallaUnica = sizes.length === 1 && sizes[0] === "Única";
  reactExports.useEffect(() => {
    if (isTallaUnica && selected !== "Única") {
      onSelect("Única");
    }
  }, [isTallaUnica, selected, onSelect]);
  if (isTallaUnica) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/50 mb-3", children: "Talla" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block px-4 py-2 text-[11px] uppercase tracking-[0.2em] bg-cream/10 text-cream/70 border border-border", children: "Talla Única" })
    ] });
  }
  function sizeStock(size) {
    if (!variants.length) return 99;
    return variants.filter((v) => v.color_name === selectedColor && v.size === size && v.piece === null).reduce((sum, v) => sum + v.stock, 0);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SizeGuideModal, { open: guideOpen, onClose: () => setGuideOpen(false), category }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/50", children: "Talla" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setGuideOpen(true), className: "text-[10px] uppercase tracking-[0.22em] text-cream/50 hover:text-acid transition-colors flex items-center gap-1", children: [
        "Guía de tallas ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 10, strokeWidth: 1.5 })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: sizes.map((size) => {
      const stock = sizeStock(size);
      const out = stock === 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => !out && onSelect(size), disabled: out, className: `min-w-[44px] px-3 py-2 text-[10px] uppercase tracking-[0.2em] border transition-all relative ${selected === size ? "bg-cream text-ink border-cream" : out ? "text-cream/20 border-border/30 cursor-not-allowed line-through" : "text-cream/60 border-border hover:border-cream hover:text-cream"}`, children: [
        size,
        !out && stock <= 3 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1.5 -right-1.5 bg-acid text-ink text-[8px] w-4 h-4 flex items-center justify-center font-bold", children: stock })
      ] }, size);
    }) })
  ] });
}
function QtyPicker({
  qty,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-cream/50 mb-3", children: "Cantidad" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 border border-border w-fit px-4 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onChange(Math.max(1, qty - 1)), "aria-label": "Reducir", className: "text-cream/50 hover:text-cream transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 14, strokeWidth: 1.5 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm tabular-nums text-cream w-6 text-center", children: qty }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onChange(qty + 1), "aria-label": "Aumentar", className: "text-cream/50 hover:text-cream transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14, strokeWidth: 1.5 }) })
    ] })
  ] });
}
function TrustBadges({
  settings
}) {
  const threshold = parseInt(settings.free_shipping_threshold ?? "200000");
  const fmtThreshold = threshold >= 1e6 ? `$${(threshold / 1e6).toFixed(1)}M` : `$${Math.round(threshold / 1e3)}k`;
  const days = settings.returns_days ?? "30";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-6 mb-10 pb-8 border-b border-border", children: [{
    icon: Package,
    label: `Envío gratis +${fmtThreshold}`
  }, {
    icon: RefreshCw,
    label: `Cambios ${days} días`
  }, {
    icon: ShieldCheck,
    label: "Pago seguro"
  }].map(({
    icon: Icon,
    label
  }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-cream/50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 13, strokeWidth: 1.5 }),
    label
  ] }, label)) });
}
function ProductAccordion({
  product,
  settings
}) {
  const threshold = parseInt(settings.free_shipping_threshold ?? "200000");
  const fmtThreshold = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0
  }).format(threshold);
  const days = settings.returns_days ?? "30";
  const shippingTime = settings.shipping_time ?? "1–3 días hábiles";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Accordion, { type: "multiple", defaultValue: ["descripcion"], children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: "descripcion", className: "border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "text-[11px] uppercase tracking-[0.28em] text-cream hover:no-underline py-4", children: "Descripción" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "text-sm leading-relaxed text-cream/70 pb-5", children: product.description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: "detalles", className: "border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "text-[11px] uppercase tracking-[0.28em] text-cream hover:no-underline py-4", children: "Detalles & Materiales" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: product.details.split("\n").map((line, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-sm text-cream/70", children: line }, i)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: "envio", className: "border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "text-[11px] uppercase tracking-[0.28em] text-cream hover:no-underline py-4", children: "Envío & Devoluciones" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionContent, { className: "text-sm leading-relaxed text-cream/70 pb-5", children: [
        "Envío gratis en pedidos mayores a ",
        fmtThreshold,
        ". Despacho en ",
        shippingTime,
        ". Cambios dentro de los ",
        days,
        " días siguientes a la compra."
      ] })
    ] })
  ] });
}
function RelatedProducts({
  currentSlug,
  category
}) {
  const {
    allProducts
  } = Route$m.useLoaderData();
  const related = getRelated(currentSlug, category, allProducts);
  if (!related.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-16 md:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1500px] px-5 md:px-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.3em] text-acid mb-3", children: "Drop 01" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-[clamp(2.4rem,6vw,5rem)] uppercase leading-[0.88] text-cream mb-10", children: "También te puede gustar" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6", children: related.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products/$slug", params: {
      slug: p.slug
    }, className: "group block", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] overflow-hidden bg-bone", children: [
        p.tag && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute left-3 top-3 z-10 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] ${p.tag.startsWith("-") ? "bg-acid text-ink" : "bg-ink text-cream"}`, children: p.tag }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.front, alt: p.name, loading: "lazy", className: "card-img card-img-front absolute inset-0 h-full w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.back, alt: "", "aria-hidden": true, loading: "lazy", className: "card-img card-img-back absolute inset-0 h-full w-full object-cover opacity-0" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs uppercase tracking-[0.18em] text-cream", children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-xs tabular-nums text-cream/70", children: fmtCOP(p.price) })
      ] })
    ] }, p.slug)) })
  ] }) });
}
function getRelated(currentSlug, category, allProducts, limit = 3) {
  const sameCategory = allProducts.filter((p) => p.slug !== currentSlug && p.category === category);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const others = allProducts.filter((p) => p.slug !== currentSlug && p.category !== category);
  return [...sameCategory, ...others].slice(0, limit);
}
export {
  ProductPage as component
};
