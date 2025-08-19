// import React, { useState } from "react";
// import {
//   Input,
//   Label,
//   Button,
//   Switch,
//   Card,
//   CardContent,
//   Textarea,
// } from "../../Components/UI/UI.jsx";
// import {
//   Settings as SettingsIcon,
//   CheckCircle,
//   AlertTriangle,
//   Upload,
//   Download,
//   Globe,
// } from "lucide-react";

// const Settings = () => {
//   const [siteName, setSiteName] = useState("Bazaarsell");
//   const [adminEmail, setAdminEmail] = useState("admin@example.com");
//   const [supportPhone, setSupportPhone] = useState("+91-9876543210");
//   const [currency, setCurrency] = useState("INR");
//   const [maintenanceMode, setMaintenanceMode] = useState(false);
//   const [metaTitle, setMetaTitle] = useState("Best Online Store in India");
//   const [metaDescription, setMetaDescription] = useState("");
//   const [themeColor, setThemeColor] = useState("indigo");
//   const [logo, setLogo] = useState(null);
//   const [favicon, setFavicon] = useState(null);
//   const [smtp, setSmtp] = useState({ host: '', port: '', user: '', pass: '' });
//   const [socialLinks, setSocialLinks] = useState({ facebook: '', instagram: '', twitter: '' });
//   const [features, setFeatures] = useState({ wishlist: true, reviews: true });
//   const [notifications, setNotifications] = useState({ email: true, sms: false });
//   const [saved, setSaved] = useState(false);

//   const handleSave = (e) => {
//     e.preventDefault();
//     console.log("Saved Settings", {
//       siteName,
//       adminEmail,
//       supportPhone,
//       currency,
//       maintenanceMode,
//       metaTitle,
//       metaDescription,
//       themeColor,
//       logo,
//       favicon,
//       smtp,
//       socialLinks,
//       features,
//       notifications,
//     });
//     setSaved(true);
//     setTimeout(() => setSaved(false), 3000);
//   };

//   const handleFileChange = (e, type) => {
//     const file = e.target.files[0];
//     if (type === 'logo') setLogo(file);
//     if (type === 'favicon') setFavicon(file);
//   };

//   const exportSettings = () => {
//     const data = {
//       siteName, adminEmail, supportPhone, currency, metaTitle, metaDescription,
//       themeColor, smtp, socialLinks, features, notifications, maintenanceMode
//     };
//     const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "settings-backup.json";
//     link.click();
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto space-y-10">
//       <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
//         <SettingsIcon className="w-6 h-6 text-indigo-600" /> Admin Settings
//       </h2>

//       <form onSubmit={handleSave} className="space-y-10">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Site Info */}
//           <Card>
//             <CardContent className="space-y-4 p-6">
//               <Label>Store Name</Label>
//               <Input value={siteName} onChange={(e) => setSiteName(e.target.value)} />
//               <Label>Currency</Label>
//               <select
//                 value={currency}
//                 onChange={(e) => setCurrency(e.target.value)}
//                 className="block w-full px-4 py-2 border rounded-md"
//               >
//                 <option value="INR">INR</option>
//                 <option value="USD">USD</option>
//                 <option value="EUR">EUR</option>
//               </select>
//               <Label>Theme Color</Label>
//               <input type="color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} />
//               <Label>Upload Logo</Label>
//               <Input type="file" onChange={(e) => handleFileChange(e, 'logo')} />
//               <Label>Upload Favicon</Label>
//               <Input type="file" onChange={(e) => handleFileChange(e, 'favicon')} />
//             </CardContent>
//           </Card>

//           {/* Contact Info */}
//           <Card>
//             <CardContent className="space-y-4 p-6">
//               <Label>Admin Email</Label>
//               <Input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
//               <Label>Support Phone</Label>
//               <Input value={supportPhone} onChange={(e) => setSupportPhone(e.target.value)} />

//               <Label>Maintenance Mode</Label>
//               <div className="flex items-center gap-2">
//                 <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
//                 {maintenanceMode && (
//                   <span className="text-yellow-500 flex items-center gap-1 text-sm">
//                     <AlertTriangle className="w-4 h-4" /> Site is in maintenance mode
//                   </span>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           {/* SEO */}
//           <Card>
//             <CardContent className="space-y-4 p-6">
//               <Label>Meta Title</Label>
//               <Input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
//               <Label>Meta Description</Label>
//               <Textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
//             </CardContent>
//           </Card>

//           {/* SMTP Settings */}
//           <Card>
//             <CardContent className="space-y-4 p-6">
//               <h3 className="font-semibold text-gray-800 dark:text-white">SMTP Settings</h3>
//               <Label>SMTP Host</Label>
//               <Input value={smtp.host} onChange={(e) => setSmtp({ ...smtp, host: e.target.value })} />
//               <Label>SMTP Port</Label>
//               <Input value={smtp.port} onChange={(e) => setSmtp({ ...smtp, port: e.target.value })} />
//               <Label>SMTP User</Label>
//               <Input value={smtp.user} onChange={(e) => setSmtp({ ...smtp, user: e.target.value })} />
//               <Label>SMTP Password</Label>
//               <Input type="password" value={smtp.pass} onChange={(e) => setSmtp({ ...smtp, pass: e.target.value })} />
//             </CardContent>
//           </Card>

//           {/* Social Links */}
//           <Card>
//             <CardContent className="space-y-4 p-6">
//               <h3 className="font-semibold text-gray-800 dark:text-white">Social Media Links</h3>
//               <Label>Facebook</Label>
//               <Input value={socialLinks.facebook} onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })} />
//               <Label>Instagram</Label>
//               <Input value={socialLinks.instagram} onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })} />
//               <Label>Twitter</Label>
//               <Input value={socialLinks.twitter} onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })} />
//             </CardContent>
//           </Card>

//           {/* Feature Toggles */}
//           <Card>
//             <CardContent className="space-y-4 p-6">
//               <h3 className="font-semibold text-gray-800 dark:text-white">Features</h3>
//               <Label>Enable Wishlist</Label>
//               <Switch checked={features.wishlist} onCheckedChange={(v) => setFeatures({ ...features, wishlist: v })} />
//               <Label>Enable Reviews</Label>
//               <Switch checked={features.reviews} onCheckedChange={(v) => setFeatures({ ...features, reviews: v })} />
//               <Label>Email Notifications</Label>
//               <Switch checked={notifications.email} onCheckedChange={(v) => setNotifications({ ...notifications, email: v })} />
//               <Label>SMS Notifications</Label>
//               <Switch checked={notifications.sms} onCheckedChange={(v) => setNotifications({ ...notifications, sms: v })} />
//             </CardContent>
//           </Card>
//         </div>

//         <div className="flex justify-end gap-4">
//           <Button type="button" onClick={exportSettings} className="bg-blue-500 text-white hover:bg-blue-600">
//             <Download className="w-4 h-4 mr-1" /> Export JSON
//           </Button>
//           <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700">
//             Save Settings
//           </Button>
//         </div>

//         {saved && (
//           <div className="flex items-center text-green-600 gap-2 text-sm font-medium mt-2">
//             <CheckCircle className="w-4 h-4" /> Settings successfully saved!
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default Settings;
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Input,
  Label,
  Button,
  Switch,
  Card,
  CardContent,
  Textarea,
} from "../../Components/UI/UI.jsx";
import {
  Settings as SettingsIcon,
  CheckCircle,
  AlertTriangle,
  Download,
  Globe,
} from "lucide-react";

const API_GET = "http://localhost:8000/api/setting/getSettingData";
const API_POST = "http://localhost:8000/api/setting/postSettingData";

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: "",
    adminEmail: "",
    supportPhone: "",
    currency: "INR",
    maintenanceMode: false,
    metaTitle: "",
    metaDescription: "",
    themeColor: "#6366f1",
    smtp: { host: "", port: "", user: "", pass: "" },
    socialLinks: { facebook: "", instagram: "", twitter: "" },
    features: { wishlist: true, reviews: true },
    notifications: { email: true, sms: false },
    logo: null,
    favicon: null,
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [faviconPreview, setFaviconPreview] = useState(null);
  const [saved, setSaved] = useState(false);

  // Load settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(API_GET);
        if (res.data) {
          setSettings(res.data);
          if (res.data.logo)
            setLogoPreview(`http://localhost:8000/uploads/${res.data.logo}`);
          if (res.data.favicon)
            setFaviconPreview(
              `http://localhost:8000/uploads/${res.data.favicon}`
            );
        }
      } catch (err) {
        console.error("Failed to load settings", err);
      }
    };
    fetchSettings();
  }, []);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    setSettings({ ...settings, [type]: file });
    type === "logo"
      ? setLogoPreview(URL.createObjectURL(file))
      : setFaviconPreview(URL.createObjectURL(file));
  };

  const handleChange = (key, value, parent = null) => {
    if (parent) {
      setSettings({
        ...settings,
        [parent]: { ...settings[parent], [key]: value },
      });
    } else {
      setSettings({ ...settings, [key]: value });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let key in settings) {
      if (["logo", "favicon"].includes(key) && settings[key] instanceof File) {
        formData.append(key, settings[key]);
      } else if (typeof settings[key] === "object") {
        formData.append(key, JSON.stringify(settings[key]));
      } else {
        formData.append(key, settings[key]);
      }
    }

    try {
      const res = await axios.post(API_POST, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error("Failed to save settings", err);
    }
  };

  const exportSettings = () => {
    const data = { ...settings };
    delete data.logo;
    delete data.favicon;
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "settings-backup.json";
    link.click();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
        <SettingsIcon className="w-6 h-6 text-indigo-600" /> Admin Settings
      </h2>

      <form onSubmit={handleSave} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Site Info */}
          <Card>
            <CardContent className="space-y-4 p-6">
              <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <Globe /> Site Information
              </h3>
              <Label>Store Name</Label>
              <Input
                value={settings.siteName}
                onChange={(e) => handleChange("siteName", e.target.value)}
              />
              <Label>Currency</Label>
              <select
                value={settings.currency}
                onChange={(e) => handleChange("currency", e.target.value)}
                className="block w-full px-4 py-2 border rounded-md"
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
              <Label>Theme Color</Label>
              <input
                type="color"
                value={settings.themeColor}
                onChange={(e) => handleChange("themeColor", e.target.value)}
              />
              <Label>Upload Logo</Label>
              <Input
                type="file"
                onChange={(e) => handleFileChange(e, "logo")}
              />
              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="logo preview"
                  className="mt-2 h-12"
                />
              )}
              <Label>Upload Favicon</Label>
              <Input
                type="file"
                onChange={(e) => handleFileChange(e, "favicon")}
              />
              {faviconPreview && (
                <img
                  src={faviconPreview}
                  alt="favicon preview"
                  className="mt-2 h-8"
                />
              )}
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardContent className="space-y-4 p-6">
              <Label>Admin Email</Label>
              <Input
                type="email"
                value={settings.adminEmail}
                onChange={(e) => handleChange("adminEmail", e.target.value)}
              />
              <Label>Support Phone</Label>
              <Input
                value={settings.supportPhone}
                onChange={(e) => handleChange("supportPhone", e.target.value)}
              />

              <Label>Maintenance Mode</Label>
              <div className="flex items-center gap-2">
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(v) => handleChange("maintenanceMode", v)}
                />
                {settings.maintenanceMode && (
                  <span className="text-yellow-500 flex items-center gap-1 text-sm">
                    <AlertTriangle className="w-4 h-4" /> Site is in maintenance
                    mode
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardContent className="space-y-4 p-6">
              <Label>Meta Title</Label>
              <Input
                value={settings.metaTitle}
                onChange={(e) => handleChange("metaTitle", e.target.value)}
              />
              <Label>Meta Description</Label>
              <Textarea
                value={settings.metaDescription}
                onChange={(e) =>
                  handleChange("metaDescription", e.target.value)
                }
              />
            </CardContent>
          </Card>

          {/* SMTP Settings */}
          <Card>
            <CardContent className="space-y-4 p-6">
              <h3 className="font-semibold text-gray-800 dark:text-white">
                SMTP Settings
              </h3>
              <Label>SMTP Host</Label>
              <Input
                value={settings.smtp.host}
                onChange={(e) => handleChange("host", e.target.value, "smtp")}
              />
              <Label>SMTP Port</Label>
              <Input
                value={settings.smtp.port}
                onChange={(e) => handleChange("port", e.target.value, "smtp")}
              />
              <Label>SMTP User</Label>
              <Input
                value={settings.smtp.user}
                onChange={(e) => handleChange("user", e.target.value, "smtp")}
              />
              <Label>SMTP Password</Label>
              <Input
                type="password"
                value={settings.smtp.pass}
                onChange={(e) => handleChange("pass", e.target.value, "smtp")}
              />
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardContent className="space-y-4 p-6">
              <h3 className="font-semibold text-gray-800 dark:text-white">
                Social Media Links
              </h3>
              <Label>Facebook</Label>
              <Input
                value={settings.socialLinks.facebook}
                onChange={(e) =>
                  handleChange("facebook", e.target.value, "socialLinks")
                }
              />
              <Label>Instagram</Label>
              <Input
                value={settings.socialLinks.instagram}
                onChange={(e) =>
                  handleChange("instagram", e.target.value, "socialLinks")
                }
              />
              <Label>Twitter</Label>
              <Input
                value={settings.socialLinks.twitter}
                onChange={(e) =>
                  handleChange("twitter", e.target.value, "socialLinks")
                }
              />
            </CardContent>
          </Card>

          {/* Feature Toggles */}
          <Card>
            <CardContent className="space-y-4 p-6">
              <h3 className="font-semibold text-gray-800 dark:text-white">
                Features
              </h3>
              <Label>Enable Wishlist</Label>
              <Switch
                checked={settings.features.wishlist}
                onCheckedChange={(v) => handleChange("wishlist", v, "features")}
              />
              <Label>Enable Reviews</Label>
              <Switch
                checked={settings.features.reviews}
                onCheckedChange={(v) => handleChange("reviews", v, "features")}
              />
              <Label>Email Notifications</Label>
              <Switch
                checked={settings.notifications.email}
                onCheckedChange={(v) =>
                  handleChange("email", v, "notifications")
                }
              />
              <Label>SMS Notifications</Label>
              <Switch
                checked={settings.notifications.sms}
                onCheckedChange={(v) => handleChange("sms", v, "notifications")}
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            onClick={exportSettings}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            <Download className="w-4 h-4 mr-1" /> Export JSON
          </Button>
          <Button
            type="submit"
            className="bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Save Settings
          </Button>
        </div>

        {saved && (
          <div className="flex items-center text-green-600 gap-2 text-sm font-medium mt-2">
            <CheckCircle className="w-4 h-4" /> Settings successfully saved!
          </div>
        )}
      </form>
    </div>
  );
};

export default Settings;
