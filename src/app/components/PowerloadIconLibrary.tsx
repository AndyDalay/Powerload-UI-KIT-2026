import { useState, useMemo, useCallback } from "react";
import * as LucideIcons from "lucide-react";
import { Search, Check, X } from "lucide-react";
// Iconsax frame import removed (file not available in current environment)

// ─── Complete Lucide icon list used in the Powerload design system ─────────────
// Sourced from the Figma Iconsax frame — all LucideXxx components

const LUCIDE_NAMES: string[] = [
  // Arrows & Navigation
  "ArrowDown","ArrowUp","ArrowLeft","ArrowRight",
  "ArrowDownLeft","ArrowDownRight","ArrowUpLeft","ArrowUpRight",
  "ArrowDownUp","ArrowUpDown","ArrowLeftRight","ArrowRightLeft",
  "ArrowDownFromLine","ArrowUpFromLine","ArrowLeftFromLine","ArrowRightFromLine",
  "ArrowDownToLine","ArrowUpToLine","ArrowLeftToLine","ArrowRightToLine",
  "ArrowDownNarrowWide","ArrowDownWideNarrow","ArrowUpNarrowWide","ArrowUpWideNarrow",
  "ArrowDownAZ","ArrowDownZA","ArrowUpAZ","ArrowUpZA",
  "ArrowDownToDot","ArrowUpFromDot",
  "ChevronDown","ChevronUp","ChevronLeft","ChevronRight",
  "ChevronsDown","ChevronsUp","ChevronsLeft","ChevronsRight",
  "MoveDown","MoveUp","MoveLeft","MoveRight",
  "MoveDownLeft","MoveDownRight","MoveUpLeft","MoveUpRight",
  "MoveHorizontal","MoveVertical","Move","MoveDiagonal",
  "Navigation","NavigationOff",
  // Circles & Status
  "Circle","CircleAlert","CircleCheck","CircleCheckBig","CircleX",
  "CirclePlus","CircleDot","CircleDivide","CircleEllipsis",
  "CirclePlay","CirclePower","CircleUser","CircleUserRound","CircleStar",
  "CircleArrowDown","CircleArrowUp","CircleArrowLeft","CircleArrowRight",
  "CircleChevronDown","CircleChevronUp","CircleChevronLeft","CircleChevronRight",
  // Squares
  "SquareCheck","SquareCheckBig","SquarePlus","SquarePen","SquarePower",
  "SquareUser","SquareUserRound","SquareParking","SquareParkingOff",
  "SquareChevronDown","SquareChevronUp","SquareChevronLeft","SquareChevronRight",
  "SquareArrowRightEnter","SquareArrowRightExit","SquareArrowOutUpRight",
  // Check & Validation
  "Check","CheckCheck","BadgeCheck",
  // Files & Documents
  "File","FileText","FileCheck","FileCheckCorner","FilePlus","FilePlusCorner",
  "FileDown","FileUp","FileInput","FileBadge","FileBox","FileClock",
  "FileChartColumn","FileChartColumnIncreasing","FileSearchCorner","FileUser",
  // Clipboard
  "Clipboard","ClipboardCheck","ClipboardClock","ClipboardCopy","ClipboardList",
  "ClipboardMinus","ClipboardPaste","ClipboardPlus","ClipboardX",
  // Bookmarks & Books
  "Book","BookCheck","BookCopy","BookMarked","BookSearch","BookUser",
  "Bookmark","BookmarkCheck","BookmarkMinus","BookmarkOff","BookmarkPlus","BookmarkX",
  // Calendar & Time
  "Calendar","CalendarCheck","CalendarCog","CalendarDays","CalendarMinus","CalendarPlus","CalendarSearch",
  "Clock","ClockCheck","ClockPlus",
  "Timer","Hourglass",
  // Messages & Communication
  "Mail","MailCheck","MailMinus","MailOpen","MailPlus","MailSearch","MailWarning","MailX","Mailbox","Mails",
  "MessageSquare","MessageSquareCheck","MessageSquareCode","MessageSquareDot",
  "MessageSquareMore","MessageSquareOff","MessageSquareText","MessageSquareWarning","MessageSquareX",
  "MessageCircleCheck","MessageCircleMore","MessageCircleOff","MessageCirclePlus",
  "MessageCircleReply","MessageCircleWarning","MessageCircleX",
  "MessagesSquare","Megaphone","MegaphoneOff",
  "Phone","PhoneCall","PhoneMissed","PhoneOff","PhoneOutgoing",
  "Mic","MicOff",
  // Users & People
  "User","UserCheck","UserCog","UserKey","UserLock","UserMinus","UserPen","UserPlus",
  "UserRound","UserRoundCheck","UserRoundCog","UserRoundKey","UserRoundMinus","UserRoundPen",
  "UserRoundPlus","UserRoundSearch","UserRoundX",
  "UserSearch","UserStar","UserX",
  "Users","UsersRound",
  // Security & Auth
  "Lock","LockKeyhole","LockKeyholeOpen","LockOpen",
  "Shield","ShieldAlert","ShieldCheck","ShieldCog","ShieldHalf","ShieldPlus","ShieldUser","ShieldX",
  "Eye","EyeOff","EyeClosed","Fingerprint",
  "KeyRound",
  // Packages & Logistics
  "Package","PackageCheck","PackageMinus","PackageOpen","PackagePlus","PackageSearch","PackageX",
  "Box","Boxes","Truck","TruckElectric","Forklift","Container","Warehouse","Route",
  "Map","MapPin","MapPinOff","MapPinX","MapPinPlus","MapPinMinus","MapPinPen","MapPinSearch","MapPinned","MapPinHouse",
  "MapPinCheck","MapPinCheckInside","MapPinPlusInside","MapPinMinusInside","MapPinXInside","MapMinus","MapPlus",
  "Navigation","Compass",
  // Charts & Data
  "ChartColumn","ChartLine","ChartNoAxesColumn","ChartNoAxesCombined","ChartSpline",
  "TrendingUp","TrendingDown","BarChart2",
  // Settings & Tools
  "Settings","Settings2","Wrench","Ruler","Scale",
  "Paintbrush","Palette","PaintRoller",
  "Toolbox",
  // Notifications & Alerts
  "Bell","BellCheck","BellDot","BellMinus","BellOff","BellPlus","BellRing",
  "Info",
  // Media & UI
  "Play","Podcast","Presentation","ScreenShare",
  "Monitor","MonitorCheck","MonitorCog","MonitorDot","MonitorDown","MonitorOff",
  "MonitorSmartphone","MonitorStop","MonitorUp","MonitorX",
  "Smartphone","Tablet","TabletSmartphone",
  "Wifi",
  // Misc UI
  "Search","SearchCheck","SearchX",
  "Funnel","FunnelPlus","FunnelX",
  "Send","SendHorizontal","SendToBack",
  "Save","Upload","Download",
  "Link","Link2Off","ExternalLink",
  "Share","Share2",
  "Repeat","Reply","Redo","RotateCcw","RotateCw",
  "RefreshCw","RefreshCcw","RefreshCwOff",
  "LayoutDashboard","LayoutGrid","Layers","LayersMinus","LayersPlus",
  "List","ListEnd","ListRestart",
  "Maximize","Minimize",
  "PanelLeftClose","PanelLeftOpen",
  "Paperclip","Pencil","PencilLine",
  "Trash","Trash2",
  "Tag","Tags",
  "Table","TableProperties",
  "ScrollText","Scroll","Newspaper","Notebook","NotebookPen","NotebookText",
  "Landmark","Building","Store",
  "Globe","GlobeLock","GlobeOff","Earth",
  "Rocket","Sparkle","Sparkles","WandSparkles","Zap","ZapOff","Bolt","Flame","Magnet",
  "Star","StarHalf","StarOff","Award","Trophy","Crown","Gem",
  "Sun","Moon","Snowflake",
  "ShoppingCart","TicketPercent",
  "DollarSign","Euro","Wallet",
  "Goal","LifeBuoy","Radiation","Siren",
  "Headphones","Headset","Music",
  "IdCard","Flag","FlagOff","AtSign","Asterisk","Hash","Infinity",
  "Forward","Split","Leaf","Languages","Handshake",
  "Image","ImageDown","ImageUp","ImagePlus",
  "Archive","ArchiveX","ArchiveRestore",
  "Book","BriefcaseBusiness","Calculator","CloudUpload","CloudDownload",
  "Copy","LogIn","LogOut","Power","PowerOff",
];

// ─── Custom Iconsax icon catalog ──────────────────────────────────────────────

type IconsaxCat = "IA" | "Logística" | "Finanzas" | "Comunicación" | "Documentos" | "Usuarios" | "Datos" | "Seguridad" | "General";

const ICONSAX_CUSTOM: { name: string; display: string; cat: IconsaxCat }[] = [
  // IA
  { name:"AiCommentary",    display:"AI Commentary",    cat:"IA" },
  { name:"AiCopy",          display:"AI Copy",          cat:"IA" },
  { name:"AiDocument",      display:"AI Document",      cat:"IA" },
  { name:"AiGenerate",      display:"AI Generate",      cat:"IA" },
  { name:"AiImage",         display:"AI Image",         cat:"IA" },
  { name:"AiMagic",         display:"AI Magic",         cat:"IA" },
  { name:"AiNetwork",       display:"AI Network",       cat:"IA" },
  { name:"AiSearch",        display:"AI Search",        cat:"IA" },
  { name:"AiStar",          display:"AI Star",          cat:"IA" },
  { name:"AiText",          display:"AI Text",          cat:"IA" },
  { name:"AiTranslate",     display:"AI Translate",     cat:"IA" },
  { name:"AiVideo",         display:"AI Video",         cat:"IA" },
  { name:"AiVoice",         display:"AI Voice",         cat:"IA" },
  { name:"AiWand",          display:"AI Wand",          cat:"IA" },
  { name:"AiWrite",         display:"AI Write",         cat:"IA" },
  // Logística
  { name:"Barcode",         display:"Barcode",          cat:"Logística" },
  { name:"BarcodeBox",      display:"Barcode Box",      cat:"Logística" },
  { name:"Cargo",           display:"Cargo",            cat:"Logística" },
  { name:"CargoShip",       display:"Cargo Ship",       cat:"Logística" },
  { name:"Crate",           display:"Crate",            cat:"Logística" },
  { name:"DeliveryBox",     display:"Delivery Box",     cat:"Logística" },
  { name:"DeliveryFast",    display:"Delivery Fast",    cat:"Logística" },
  { name:"DeliveryTruck",   display:"Delivery Truck",   cat:"Logística" },
  { name:"Dolly",           display:"Dolly",            cat:"Logística" },
  { name:"Fleet",           display:"Fleet",            cat:"Logística" },
  { name:"FleetCheck",      display:"Fleet Check",      cat:"Logística" },
  { name:"FleetRoute",      display:"Fleet Route",      cat:"Logística" },
  { name:"Fork",            display:"Forklift",         cat:"Logística" },
  { name:"FreightCar",      display:"Freight Car",      cat:"Logística" },
  { name:"Inventory",       display:"Inventory",        cat:"Logística" },
  { name:"InventoryCheck",  display:"Inventory Check",  cat:"Logística" },
  { name:"Pallet",          display:"Pallet",           cat:"Logística" },
  { name:"PalletCheck",     display:"Pallet Check",     cat:"Logística" },
  { name:"QrCode",          display:"QR Code",          cat:"Logística" },
  { name:"Scan",            display:"Scan",             cat:"Logística" },
  { name:"ScanBarcode",     display:"Scan Barcode",     cat:"Logística" },
  { name:"ShipmentBox",     display:"Shipment Box",     cat:"Logística" },
  { name:"StockCheck",      display:"Stock Check",      cat:"Logística" },
  { name:"Trolley",         display:"Trolley",          cat:"Logística" },
  { name:"Weighbridge",     display:"Weighbridge",      cat:"Logística" },
  // Finanzas
  { name:"BankTransfer",    display:"Bank Transfer",    cat:"Finanzas" },
  { name:"BillCheck",       display:"Bill Check",       cat:"Finanzas" },
  { name:"Budget",          display:"Budget",           cat:"Finanzas" },
  { name:"ChartProfit",     display:"Chart Profit",     cat:"Finanzas" },
  { name:"CoinStack",       display:"Coin Stack",       cat:"Finanzas" },
  { name:"CreditCard",      display:"Credit Card",      cat:"Finanzas" },
  { name:"CreditCardEdit",  display:"Credit Card Edit", cat:"Finanzas" },
  { name:"Expense",         display:"Expense",          cat:"Finanzas" },
  { name:"Invoice",         display:"Invoice",          cat:"Finanzas" },
  { name:"InvoiceCheck",    display:"Invoice Check",    cat:"Finanzas" },
  { name:"Ledger",          display:"Ledger",           cat:"Finanzas" },
  { name:"Payment",         display:"Payment",          cat:"Finanzas" },
  { name:"PaymentCheck",    display:"Payment Check",    cat:"Finanzas" },
  { name:"PriceTag",        display:"Price Tag",        cat:"Finanzas" },
  { name:"Receipt",         display:"Receipt",          cat:"Finanzas" },
  { name:"ReceiptCheck",    display:"Receipt Check",    cat:"Finanzas" },
  { name:"Revenue",         display:"Revenue",          cat:"Finanzas" },
  { name:"TaxDocument",     display:"Tax Document",     cat:"Finanzas" },
  { name:"Wallet2",         display:"Wallet",           cat:"Finanzas" },
  { name:"WalletCheck",     display:"Wallet Check",     cat:"Finanzas" },
  // Comunicación
  { name:"Announce",        display:"Announce",         cat:"Comunicación" },
  { name:"BotMessage",      display:"Bot Message",      cat:"Comunicación" },
  { name:"ChatBot",         display:"Chat Bot",         cat:"Comunicación" },
  { name:"ChatBubble",      display:"Chat Bubble",      cat:"Comunicación" },
  { name:"ChatGroup",       display:"Chat Group",       cat:"Comunicación" },
  { name:"EmailAlert",      display:"Email Alert",      cat:"Comunicación" },
  { name:"EmailForward",    display:"Email Forward",    cat:"Comunicación" },
  { name:"EmailSync",       display:"Email Sync",       cat:"Comunicación" },
  { name:"GroupChat",       display:"Group Chat",       cat:"Comunicación" },
  { name:"InboxIn",         display:"Inbox In",         cat:"Comunicación" },
  { name:"InboxOut",        display:"Inbox Out",        cat:"Comunicación" },
  { name:"MessageAlert",    display:"Message Alert",    cat:"Comunicación" },
  { name:"MessagePin",      display:"Message Pin",      cat:"Comunicación" },
  { name:"MessageStar",     display:"Message Star",     cat:"Comunicación" },
  { name:"NotificationBell",display:"Notification Bell",cat:"Comunicación" },
  { name:"PushAlert",       display:"Push Alert",       cat:"Comunicación" },
  { name:"SmsCode",         display:"SMS Code",         cat:"Comunicación" },
  { name:"VoiceMessage",    display:"Voice Message",    cat:"Comunicación" },
  // Documentos
  { name:"ContractSign",    display:"Contract Sign",    cat:"Documentos" },
  { name:"DocApproved",     display:"Doc Approved",     cat:"Documentos" },
  { name:"DocExport",       display:"Doc Export",       cat:"Documentos" },
  { name:"DocImport",       display:"Doc Import",       cat:"Documentos" },
  { name:"DocLink",         display:"Doc Link",         cat:"Documentos" },
  { name:"DocLock",         display:"Doc Lock",         cat:"Documentos" },
  { name:"DocPin",          display:"Doc Pin",          cat:"Documentos" },
  { name:"DocScan",         display:"Doc Scan",         cat:"Documentos" },
  { name:"DocSearch",       display:"Doc Search",       cat:"Documentos" },
  { name:"DocShield",       display:"Doc Shield",       cat:"Documentos" },
  { name:"DocSign",         display:"Doc Sign",         cat:"Documentos" },
  { name:"DocSync",         display:"Doc Sync",         cat:"Documentos" },
  { name:"DocTemplate",     display:"Doc Template",     cat:"Documentos" },
  { name:"FolderOpen",      display:"Folder Open",      cat:"Documentos" },
  { name:"FolderPin",       display:"Folder Pin",       cat:"Documentos" },
  { name:"FolderShare",     display:"Folder Share",     cat:"Documentos" },
  { name:"FolderSync",      display:"Folder Sync",      cat:"Documentos" },
  { name:"FormCheck",       display:"Form Check",       cat:"Documentos" },
  { name:"FormEdit",        display:"Form Edit",        cat:"Documentos" },
  { name:"PdfFile",         display:"PDF File",         cat:"Documentos" },
  { name:"Spreadsheet",     display:"Spreadsheet",      cat:"Documentos" },
  // Usuarios
  { name:"AddFriend",       display:"Add Friend",       cat:"Usuarios" },
  { name:"AdminBadge",      display:"Admin Badge",      cat:"Usuarios" },
  { name:"Blocked",         display:"Blocked",          cat:"Usuarios" },
  { name:"ContactBook",     display:"Contact Book",     cat:"Usuarios" },
  { name:"Followers",       display:"Followers",        cat:"Usuarios" },
  { name:"Following",       display:"Following",        cat:"Usuarios" },
  { name:"GuestUser",       display:"Guest User",       cat:"Usuarios" },
  { name:"ProfileCard",     display:"Profile Card",     cat:"Usuarios" },
  { name:"ProfileCheck",    display:"Profile Check",    cat:"Usuarios" },
  { name:"ProfileEdit",     display:"Profile Edit",     cat:"Usuarios" },
  { name:"ProfileGroup",    display:"Profile Group",    cat:"Usuarios" },
  { name:"ProfileLock",     display:"Profile Lock",     cat:"Usuarios" },
  { name:"ProfilePin",      display:"Profile Pin",      cat:"Usuarios" },
  { name:"ProfileStar",     display:"Profile Star",     cat:"Usuarios" },
  { name:"RoleBadge",       display:"Role Badge",       cat:"Usuarios" },
  { name:"TeamLead",        display:"Team Lead",        cat:"Usuarios" },
  { name:"UserVerified",    display:"User Verified",    cat:"Usuarios" },
  // Datos
  { name:"Analytics",       display:"Analytics",        cat:"Datos" },
  { name:"AnalyticsUp",     display:"Analytics Up",     cat:"Datos" },
  { name:"ChartBar",        display:"Chart Bar",        cat:"Datos" },
  { name:"ChartDoughnut",   display:"Chart Doughnut",   cat:"Datos" },
  { name:"ChartGrowth",     display:"Chart Growth",     cat:"Datos" },
  { name:"ChartRadar",      display:"Chart Radar",      cat:"Datos" },
  { name:"CloudData",       display:"Cloud Data",       cat:"Datos" },
  { name:"CloudSync",       display:"Cloud Sync",       cat:"Datos" },
  { name:"Dashboard2",      display:"Dashboard",        cat:"Datos" },
  { name:"DataExport",      display:"Data Export",      cat:"Datos" },
  { name:"DataImport",      display:"Data Import",      cat:"Datos" },
  { name:"DataSync",        display:"Data Sync",        cat:"Datos" },
  { name:"Database",        display:"Database",         cat:"Datos" },
  { name:"DatabaseCheck",   display:"Database Check",   cat:"Datos" },
  { name:"FunnelData",      display:"Funnel Data",      cat:"Datos" },
  { name:"Kpi",             display:"KPI",              cat:"Datos" },
  { name:"Pipeline",        display:"Pipeline",         cat:"Datos" },
  { name:"ReportChart",     display:"Report Chart",     cat:"Datos" },
  { name:"TableData",       display:"Table Data",       cat:"Datos" },
  // Seguridad
  { name:"AuditLog",        display:"Audit Log",        cat:"Seguridad" },
  { name:"Encryption",      display:"Encryption",       cat:"Seguridad" },
  { name:"Firewall",        display:"Firewall",         cat:"Seguridad" },
  { name:"KeyAccess",       display:"Key Access",       cat:"Seguridad" },
  { name:"KeyRotate",       display:"Key Rotate",       cat:"Seguridad" },
  { name:"PasswordCheck",   display:"Password Check",   cat:"Seguridad" },
  { name:"PasswordLock",    display:"Password Lock",    cat:"Seguridad" },
  { name:"PermissionDeny",  display:"Permission Deny",  cat:"Seguridad" },
  { name:"PermissionGrant", display:"Permission Grant", cat:"Seguridad" },
  { name:"ShieldVerified",  display:"Shield Verified",  cat:"Seguridad" },
  { name:"Sso",             display:"SSO",              cat:"Seguridad" },
  { name:"TwoFactor",       display:"2FA",              cat:"Seguridad" },
  { name:"VpnLock",         display:"VPN Lock",         cat:"Seguridad" },
  // General
  { name:"AppGrid",         display:"App Grid",         cat:"General" },
  { name:"Bookmark2",       display:"Bookmark",         cat:"General" },
  { name:"BulkAction",      display:"Bulk Action",      cat:"General" },
  { name:"Category",        display:"Category",         cat:"General" },
  { name:"Chip",            display:"Chip",             cat:"General" },
  { name:"ColorPicker",     display:"Color Picker",     cat:"General" },
  { name:"Component",       display:"Component",        cat:"General" },
  { name:"Design",          display:"Design",           cat:"General" },
  { name:"DragDrop",        display:"Drag & Drop",      cat:"General" },
  { name:"EmojiHappy",      display:"Emoji Happy",      cat:"General" },
  { name:"EmojiSad",        display:"Emoji Sad",        cat:"General" },
  { name:"Extension",       display:"Extension",        cat:"General" },
  { name:"FavoriteStar",    display:"Favorite Star",    cat:"General" },
  { name:"GridView",        display:"Grid View",        cat:"General" },
  { name:"HomeAlt",         display:"Home",             cat:"General" },
  { name:"Integration",     display:"Integration",      cat:"General" },
  { name:"ListView",        display:"List View",        cat:"General" },
  { name:"Mention",         display:"Mention",          cat:"General" },
  { name:"Notification2",   display:"Notification",     cat:"General" },
  { name:"Pin",             display:"Pin",              cat:"General" },
  { name:"Shortcut",        display:"Shortcut",         cat:"General" },
  { name:"SortAz",          display:"Sort A-Z",         cat:"General" },
  { name:"Theme",           display:"Theme",            cat:"General" },
  { name:"Widget",          display:"Widget",           cat:"General" },
];

// ─── Iconsax custom categories ────────────────────────────────────────────────
const ICONSAX_CATEGORIES: IconsaxCat[] = [
  "IA","Logística","Finanzas","Comunicación","Documentos","Usuarios","Datos","Seguridad","General"
];

// ─── Icon size options ─────────────────────────────────────────────────────────
const SIZE_OPTIONS = [
  { label: "XS 14px",  value: 14 },
  { label: "S 16px",   value: 16 },
  { label: "M 20px",   value: 20 },
  { label: "L 24px",   value: 24 },
  { label: "XL 32px",  value: 32 },
];

// ─── Color options ─────────────────────────────────────────────────────────────
const COLOR_OPTIONS = [
  { label: "Default",  value: "#A1A1B9" },
  { label: "Active",   value: "#C22339" },
  { label: "Dark",     value: "#2A2A38" },
  { label: "Success",  value: "#48BB78" },
  { label: "Warning",  value: "#FBC02D" },
  { label: "Danger",   value: "#E22824" },
  { label: "Info",     value: "#0174D9" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function slugify(name: string) {
  return name
    .replace(/([A-Z])/g, (m, c, i) => (i > 0 ? " " : "") + c)
    .replace(/\s+/g, " ")
    .trim();
}

// ─── Main component ───────────────────────────────────────────────────────────
export function PowerloadIconLibrary() {
  const [activeTab, setActiveTab] = useState<"lucide" | "iconsax">("lucide");
  const [search, setSearch] = useState("");
  const [iconSize, setIconSize] = useState(20);
  const [iconColor, setIconColor] = useState("#A1A1B9");
  const [copied, setCopied] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<IconsaxCat | "Todos">("Todos");

  // Filter Lucide icons
  const filteredLucide = useMemo(() => {
    const q = search.toLowerCase();
    return LUCIDE_NAMES.filter(n => {
      const icon = LucideIcons[n as keyof typeof LucideIcons];
      return typeof icon === "function" && n.toLowerCase().includes(q);
    });
  }, [search]);

  const handleCopy = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 1800);
    });
  }, []);

  const lucideCount = useMemo(
    () => LUCIDE_NAMES.filter(n => typeof LucideIcons[n as keyof typeof LucideIcons] === "function").length,
    []
  );

  // Filter Iconsax icons
  const filteredIconsax = useMemo(() => {
    const q = search.toLowerCase();
    return ICONSAX_CUSTOM.filter(ic => {
      return ic.display.toLowerCase().includes(q) && (activeCategory === "Todos" || ic.cat === activeCategory);
    });
  }, [search, activeCategory]);

  // ─── Styles ────────────────────────────────────────────────────────────────
  const s = {
    container: {
      backgroundColor: "#FFFFFF",
    } as React.CSSProperties,

    tabs: {
      display: "flex",
      gap: "4px",
      borderBottom: "1px solid #ECECF4",
      marginBottom: "28px",
      paddingBottom: "0",
    } as React.CSSProperties,

    tab: (active: boolean) => ({
      fontFamily: "'Poppins', sans-serif",
      fontSize: "13px",
      fontWeight: active ? 600 : 400,
      color: active ? "#C22339" : "#7E7E97",
      background: "none",
      border: "none",
      borderBottom: active ? "2px solid #C22339" : "2px solid transparent",
      padding: "10px 18px",
      cursor: "pointer",
      marginBottom: "-1px",
      transition: "color 150ms",
    }) as React.CSSProperties,

    controls: {
      display: "flex",
      gap: "12px",
      alignItems: "center",
      marginBottom: "20px",
      flexWrap: "wrap" as const,
    },

    searchBox: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      backgroundColor: "#F9F9FC",
      border: "1px solid #E1E1EC",
      borderRadius: "10px",
      padding: "8px 14px",
      flex: "1",
      minWidth: "200px",
      maxWidth: "340px",
    } as React.CSSProperties,

    searchInput: {
      border: "none",
      background: "none",
      outline: "none",
      fontFamily: "'Poppins', sans-serif",
      fontSize: "13px",
      color: "#2A2A38",
      width: "100%",
    } as React.CSSProperties,

    iconGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(88px, 1fr))",
      gap: "4px",
    } as React.CSSProperties,

    iconCell: (isHovered: boolean) => ({
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      gap: "8px",
      padding: "14px 8px",
      borderRadius: "10px",
      backgroundColor: isHovered ? "#F9F9FC" : "transparent",
      cursor: "pointer",
      transition: "background 120ms",
    }),

    iconName: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: "10px",
      color: "#A1A1B9",
      textAlign: "center" as const,
      wordBreak: "break-word" as const,
      lineHeight: "1.3",
    } as React.CSSProperties,

    statPill: (color: string, bg: string) => ({
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      padding: "3px 10px",
      borderRadius: "20px",
      backgroundColor: bg,
      fontFamily: "'Poppins', sans-serif",
      fontSize: "11px",
      fontWeight: 600,
      color,
    }) as React.CSSProperties,

    sizeBtn: (active: boolean) => ({
      fontFamily: "'Poppins', sans-serif",
      fontSize: "11px",
      fontWeight: active ? 600 : 400,
      color: active ? "#C22339" : "#7E7E97",
      background: active ? "#FBE1E1" : "transparent",
      border: `1px solid ${active ? "#C22339" : "#E1E1EC"}`,
      borderRadius: "6px",
      padding: "4px 10px",
      cursor: "pointer",
      transition: "all 120ms",
    }) as React.CSSProperties,

    colorSwatch: (color: string, active: boolean) => ({
      width: "22px",
      height: "22px",
      borderRadius: "50%",
      backgroundColor: color,
      cursor: "pointer",
      border: active ? `2px solid #2A2A38` : "2px solid transparent",
      boxShadow: active ? "0 0 0 2px #ECECF4" : "none",
      transition: "all 120ms",
    }) as React.CSSProperties,

    emptyState: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      padding: "48px 20px",
      gap: "12px",
      color: "#BDBDD1",
    } as React.CSSProperties,

    catChip: (active: boolean) => ({
      fontFamily: "'Poppins', sans-serif",
      fontSize: "11px",
      fontWeight: active ? 600 : 400,
      color: active ? "#C22339" : "#7E7E97",
      background: active ? "#FBE1E1" : "#F3F3F9",
      border: "none",
      borderRadius: "6px",
      padding: "5px 12px",
      cursor: "pointer",
      transition: "all 120ms",
      whiteSpace: "nowrap" as const,
    }) as React.CSSProperties,
  };

  return (
    <div style={s.container}>

      {/* ── Stats bar ─────────────────────────────────────────────── */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "24px" }}>
        <span style={s.statPill("#C22339","#FBE1E1")}>
          {lucideCount + ICONSAX_CUSTOM.length} íconos totales
        </span>
        <span style={s.statPill("#0174D9","#DBEEFF")}>
          {lucideCount} Lucide
        </span>
        <span style={s.statPill("#089F71","#E8F7EE")}>
          {ICONSAX_CUSTOM.length} Custom (Iconsax)
        </span>
      </div>

      {/* ── Tabs ─────────────────────────────────────────────────── */}
      <div style={s.tabs}>
        <button style={s.tab(activeTab === "lucide")} onClick={() => setActiveTab("lucide")}>
          Lucide Icons ({lucideCount})
        </button>
        <button style={s.tab(activeTab === "iconsax")} onClick={() => setActiveTab("iconsax")}>
          Custom Iconsax ({ICONSAX_CUSTOM.length})
        </button>
      </div>

      {/* ── Controls row ──────────────────────────────────────────── */}
      <div style={s.controls}>
        {/* Search */}
        <div style={s.searchBox}>
          <Search size={14} color="#A1A1B9" strokeWidth={2} />
          <input
            style={s.searchInput}
            placeholder="Buscar íconos…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button
              style={{ border:"none", background:"none", cursor:"pointer", padding:0, display:"flex" }}
              onClick={() => setSearch("")}
            >
              <X size={13} color="#A1A1B9" />
            </button>
          )}
        </div>

        {/* Size selector */}
        <div style={{ display:"flex", gap:"4px", alignItems:"center" }}>
          {SIZE_OPTIONS.map(opt => (
            <button
              key={opt.value}
              style={s.sizeBtn(iconSize === opt.value)}
              onClick={() => setIconSize(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Color selector */}
        <div style={{ display:"flex", gap:"6px", alignItems:"center" }}>
          <span style={{ fontFamily:"'Poppins', sans-serif", fontSize:"11px", color:"#A1A1B9" }}>Color:</span>
          {COLOR_OPTIONS.map(opt => (
            <button
              key={opt.value}
              style={s.colorSwatch(opt.value, iconColor === opt.value)}
              title={opt.label}
              onClick={() => setIconColor(opt.value)}
            />
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          TAB: LUCIDE ICONS
      ═══════════════════════════════════════════════════════════ */}
      {activeTab === "lucide" && (
        <>
          {/* Result count */}
          <p style={{
            fontFamily:"'Poppins', sans-serif", fontSize:"11px", color:"#A1A1B9",
            marginBottom:"16px",
          }}>
            {filteredLucide.length} íconos{search ? ` para "${search}"` : ""}
          </p>

          {filteredLucide.length === 0 ? (
            <div style={s.emptyState}>
              <Search size={32} color="#BDBDD1" />
              <p style={{ fontFamily:"'Poppins', sans-serif", fontSize:"14px", margin:0 }}>
                No se encontraron íconos para "{search}"
              </p>
            </div>
          ) : (
            <div style={s.iconGrid}>
              {filteredLucide.map(name => {
                const IconComp = LucideIcons[name as keyof typeof LucideIcons] as React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }> | undefined;
                if (!IconComp) return null;
                const isCopied = copied === name;
                const importStr = `import { ${name} } from 'lucide-react'`;
                return (
                  <LucideIconCell
                    key={name}
                    name={name}
                    size={iconSize}
                    color={iconColor}
                    isCopied={isCopied}
                    importStr={importStr}
                    onCopy={() => handleCopy(importStr, name)}
                    IconComp={IconComp}
                  />
                );
              })}
            </div>
          )}

          {/* Usage note */}
          <div style={{
            marginTop:"32px", padding:"16px 20px",
            backgroundColor:"#F9F9FC", borderRadius:"10px",
            border:"1px solid #ECECF4",
          }}>
            <p style={{ fontFamily:"'Poppins', sans-serif", fontSize:"12px", fontWeight:600, color:"#55556C", margin:"0 0 4px" }}>
              Uso en componentes
            </p>
            <code style={{ fontFamily:"'Courier New', monospace", fontSize:"12px", color:"#C22339" }}>
              import {"{ Archive, Truck, Search }"} from 'lucide-react'
            </code>
            <p style={{ fontFamily:"'Poppins', sans-serif", fontSize:"11px", color:"#A1A1B9", margin:"8px 0 0" }}>
              Tamaños estándar: 14px (2xs) · 16px (xs) · 18px (s) · 20px (m) · 24px (l). Usa{" "}
              <code style={{ color:"#C22339" }}>strokeWidth={"{1.75}"}</code> para estilo Powerload.
            </p>
          </div>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════════
          TAB: CUSTOM ICONSAX ICONS
      ═══════════════════════════════════════════════════════════ */}
      {activeTab === "iconsax" && (
        <>
          {/* Category filter */}
          <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", marginBottom:"18px" }}>
            <button style={s.catChip(activeCategory === "Todos")} onClick={() => setActiveCategory("Todos")}>
              Todos ({ICONSAX_CUSTOM.length})
            </button>
            {ICONSAX_CATEGORIES.map(cat => {
              const count = ICONSAX_CUSTOM.filter(ic => ic.cat === cat).length;
              return (
                <button key={cat} style={s.catChip(activeCategory === cat)} onClick={() => setActiveCategory(cat)}>
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Result count */}
          <p style={{
            fontFamily:"'Poppins', sans-serif", fontSize:"11px", color:"#A1A1B9",
            marginBottom:"16px",
          }}>
            {filteredIconsax.length} íconos{search ? ` para "${search}"` : ""}
          </p>

          {/* Custom icon cards */}
          {filteredIconsax.length === 0 ? (
            <div style={s.emptyState}>
              <Search size={32} color="#BDBDD1" />
              <p style={{ fontFamily:"'Poppins', sans-serif", fontSize:"14px", margin:0 }}>
                No se encontraron íconos
              </p>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
              gap: "4px",
            }}>
              {filteredIconsax.map(ic => {
                const importStr = `// import { ${ic.name} } from '../../imports/Iconsax-1/Iconsax'`;
                const isCopied = copied === ic.name;
                return (
                  <button
                    key={ic.name}
                    title={`${ic.display} · ${ic.cat}`}
                    onClick={() => handleCopy(ic.name, ic.name)}
                    style={{
                      display:"flex", flexDirection:"column", alignItems:"center", gap:"8px",
                      padding:"16px 8px", borderRadius:"10px", cursor:"pointer",
                      backgroundColor: isCopied ? "#F9F9FC" : "transparent",
                      border: "1px solid transparent",
                      transition:"all 120ms",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#F9F9FC")}
                    onMouseLeave={e => { if (!isCopied) e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    {/* Custom icon placeholder — shows initials of display name */}
                    <div style={{
                      width: iconSize + 8,
                      height: iconSize + 8,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      backgroundColor: "#FBE1E1",
                      borderRadius: "8px",
                      flexShrink: 0,
                    }}>
                      <span style={{ fontFamily:"'Poppins', sans-serif", fontSize: Math.max(8, iconSize * 0.55) + "px", fontWeight:700, color:"#C22339" }}>
                        {ic.display.slice(0,2).toUpperCase()}
                      </span>
                    </div>
                    <span style={s.iconName}>
                      {isCopied ? "✓ Copiado" : ic.display}
                    </span>
                    <span style={{
                      fontFamily:"'Poppins', sans-serif", fontSize:"9px",
                      color:"#BDBDD1", textTransform:"uppercase", letterSpacing:"0.5px",
                    }}>
                      {ic.cat}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Full visual reference */}
          <div style={{ marginTop:"36px" }}>
            <p style={{
              fontFamily:"'Poppins', sans-serif", fontSize:"10px", fontWeight:600,
              letterSpacing:"1px", textTransform:"uppercase", color:"#A1A1B9",
              marginBottom:"12px",
            }}>
              Referencia visual completa — Frame de Figma (todos los íconos ~500)
            </p>
            <div style={{
              border:"1px solid #ECECF4", borderRadius:"12px",
              overflow:"auto", maxHeight:"360px",
              backgroundColor:"#FAFAFA", padding:"12px",
            }}>
              <div style={{ transform:"scale(1.5)", transformOrigin:"top left", width:"66.67%" }}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  height: "160px", gap: "12px", flexDirection: "column",
                }}>
                  <span style={{ fontFamily:"'Poppins', sans-serif", fontSize:"13px", color:"#BDBDD1" }}>
                    Frame de Figma no disponible en este entorno
                  </span>
                  <span style={{ fontFamily:"'Poppins', sans-serif", fontSize:"11px", color:"#D2D2E1" }}>
                    Usa el tab de búsqueda para explorar los íconos
                  </span>
                </div>
              </div>
            </div>
            <p style={{ fontFamily:"'Poppins', sans-serif", fontSize:"11px", color:"#A1A1B9", marginTop:"8px" }}>
              Los primeros ~340 íconos son variantes Lucide. Los ~215 restantes son los iconos Custom de Iconsax.
            </p>
          </div>

          {/* Usage note */}
          <div style={{
            marginTop:"24px", padding:"16px 20px",
            backgroundColor:"#F9F9FC", borderRadius:"10px",
            border:"1px solid #ECECF4",
          }}>
            <p style={{ fontFamily:"'Poppins', sans-serif", fontSize:"12px", fontWeight:600, color:"#55556C", margin:"0 0 8px" }}>
              Uso en componentes
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
              <code style={{ fontFamily:"'Courier New', monospace", fontSize:"11px", color:"#55556C", backgroundColor:"#ECECF4", padding:"6px 10px", borderRadius:"6px", display:"block" }}>
                {`import Iconsax from '../../imports/Iconsax-1/Iconsax'`}
              </code>
              <p style={{ fontFamily:"'Poppins', sans-serif", fontSize:"11px", color:"#A1A1B9", margin:0 }}>
                Los íconos custom aplican color usando la variable CSS{" "}
                <code style={{ color:"#C22339" }}>--stroke-0</code>. 
                Para componentes específicos, crea wrappers individuales desde el archivo de importación.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Lucide Icon Cell ─────────────────────────────────────────────────────────

interface LucideIconCellProps {
  name: string;
  size: number;
  color: string;
  isCopied: boolean;
  importStr: string;
  onCopy: () => void;
  IconComp: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
}

function LucideIconCell({ name, size, color, isCopied, onCopy, IconComp }: LucideIconCellProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onCopy}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={`${slugify(name)} · click para copiar import`}
      style={{
        display:"flex", flexDirection:"column", alignItems:"center", gap:"8px",
        padding:"14px 6px", borderRadius:"10px", cursor:"pointer",
        backgroundColor: hovered || isCopied ? "#F9F9FC" : "transparent",
        border: `1px solid ${hovered ? "#E1E1EC" : "transparent"}`,
        transition:"all 120ms",
        position:"relative",
      }}
    >
      {isCopied
        ? <Check size={size} color="#48BB78" strokeWidth={2} />
        : <IconComp size={size} color={color} strokeWidth={1.75} />
      }
      <span style={{
        fontFamily:"'Poppins', sans-serif",
        fontSize:"9px",
        color: isCopied ? "#48BB78" : "#A1A1B9",
        textAlign:"center",
        wordBreak:"break-all",
        lineHeight:"1.3",
        maxWidth:"76px",
      }}>
        {isCopied ? "Copiado ✓" : slugify(name)}
      </span>
    </button>
  );
}