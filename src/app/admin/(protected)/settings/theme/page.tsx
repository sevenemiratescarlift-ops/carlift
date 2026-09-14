import { getThemeSettings } from "@/lib/data";
import { PageHeader, Card } from "@/components/admin/ui";
import { ThemeEditor } from "@/components/admin/ThemeEditor";

export const dynamic = "force-dynamic";
export const metadata = { title: "Theme & Colors" };

export default async function AdminThemeSettingsPage() {
  const theme = await getThemeSettings();

  return (
    <div>
      <PageHeader title="Theme & Colors" description="Choose a preset or fully customize the website's colors. Changes apply instantly, site-wide, with no redeploy." />
      <Card>
        <ThemeEditor
          presetName={theme.presetName || "custom"}
          initial={{
            primaryColor: theme.primaryColor || "#0077B6",
            secondaryColor: theme.secondaryColor || "#03045E",
            accentColor: theme.accentColor || "#00B4D8",
            backgroundColor: theme.backgroundColor || "#03045E",
            cardColor: theme.cardColor || "#0B1E4D",
            textColor: theme.textColor || "#F8FAFC",
            mutedTextColor: theme.mutedTextColor || "#90E0EF",
            borderColor: theme.borderColor || "#124A7A",
            navbarColor: theme.navbarColor || "#03045E",
            footerColor: theme.footerColor || "#020332",
            buttonColor: theme.buttonColor || "#00B4D8",
            buttonHoverColor: theme.buttonHoverColor || "#0096C7",
            gradientStart: theme.gradientStart || "#03045E",
            gradientEnd: theme.gradientEnd || "#00B4D8",
          }}
        />
      </Card>
    </div>
  );
}
