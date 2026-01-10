import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DesktopLayout from "@/components/layout/DesktopLayout";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

/* -------------------- helpers -------------------- */

const SETTINGS_KEY = "msme_settings";

interface StoredSettings {
  fullName: string;
  businessName: string;
  autoApprove: boolean;
  guardianMode: boolean;
  notifications: boolean;
}

/* -------------------- component -------------------- */

const Settings = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // profile
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");

  // preferences
  const [autoApprove, setAutoApprove] = useState(false);
  const [guardianMode, setGuardianMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const [saving, setSaving] = useState(false);

  /* -------------------- auth guard -------------------- */

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  /* -------------------- load saved settings -------------------- */

  useEffect(() => {
    if (!user) return;

    const saved = localStorage.getItem(SETTINGS_KEY);
    if (!saved) {
      // defaults
      setFullName(user.user_metadata?.full_name || "");
      return;
    }

    const data: StoredSettings = JSON.parse(saved);

    setFullName(data.fullName);
    setBusinessName(data.businessName);
    setAutoApprove(data.autoApprove);
    setGuardianMode(data.guardianMode);
    setNotifications(data.notifications);
  }, [user]);

  /* -------------------- save handler -------------------- */

  const handleSave = () => {
    setSaving(true);

    const payload: StoredSettings = {
      fullName,
      businessName,
      autoApprove,
      guardianMode,
      notifications,
    };

    // simulate API save
    setTimeout(() => {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(payload));
      setSaving(false);
    }, 600);
  };

  /* -------------------- loading -------------------- */

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  /* -------------------- UI -------------------- */

  return (
    <DesktopLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-8 py-6 border-b border-border bg-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <SettingsIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                Settings
              </h1>
              <p className="text-muted-foreground">
                Manage your account and preferences
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-2xl space-y-6">
            {/* Profile */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>
                      Your account information
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={user.email || ""} disabled />
                </div>

                <div className="space-y-2">
                  <Label>Business Name</Label>
                  <Input
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Your business name"
                  />
                </div>

                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>

            {/* AI Preferences */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <CardTitle>AI Preferences</CardTitle>
                    <CardDescription>
                      Control how the AI manages your business
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      Auto-approve small orders
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Orders under ₹5,000 from trusted customers
                    </p>
                  </div>
                  <Switch
                    checked={autoApprove}
                    onCheckedChange={setAutoApprove}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Guardian Mode</p>
                    <p className="text-sm text-muted-foreground">
                      AI monitors your wellbeing and workload
                    </p>
                  </div>
                  <Switch
                    checked={guardianMode}
                    onCheckedChange={setGuardianMode}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>
                      How you receive updates
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified about important updates
                    </p>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
};

export default Settings;
