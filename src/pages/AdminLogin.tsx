import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN_PASSWORD } from "@/lib/eventStore";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // Already authenticated?
  if (sessionStorage.getItem("rec_admin") === "1") {
    navigate("/admin/dashboard", { replace: true });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("rec_admin", "1");
      navigate("/admin/dashboard", { replace: true });
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8 shadow-lg w-full max-w-sm space-y-5">
        <div className="flex flex-col items-center gap-2 mb-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock className="w-5 h-5 text-primary" />
          </div>
          <h1 className="font-display font-bold text-xl text-foreground">Admin Access</h1>
          <p className="text-muted-foreground text-sm font-body text-center">Enter the admin password to continue</p>
        </div>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(false); }}
          className={error ? "border-destructive" : ""}
        />
        {error && <p className="text-destructive text-xs font-body">Incorrect password. Please try again.</p>}
        <Button type="submit" className="w-full">Sign In</Button>
      </form>
    </div>
  );
};

export default AdminLogin;
