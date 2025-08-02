import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RegisterCompany = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    national_id: "",
    birth_place: "",
    birth_date: "",
    gender: "",
    phone_number: "",
    address: "",
    village: "",
    subdistrict: "",
    city: "",
    province: "",
    country: "",
    postal_code: "",
    company_name: "",
    kyc_proof_file_personal: null as File | null,
    kyc_proof_file_company: null as File | null
    // kyc_proof_file_personal: null as File | null
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (file: File | null) => {
    setFormData(prev => ({ ...prev, kyc_proof_file_company: file, kyc_proof_file_personal: file }));
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    setStep(2);
  };


// ini untuk submit ke backend atau api 
  const submitToBackend = async () => {
  const form = new FormData();
  form.append("username", formData.username);
  form.append("email", formData.email);
  form.append("password", formData.password);
  form.append("password_confirmation", formData.confirmPassword);
  form.append("first_name", formData.first_name);
  form.append("last_name", formData.last_name);
  form.append("national_id", formData.national_id);
  form.append("birth_place", formData.birth_place);
  form.append("birth_date", formData.birth_date);
  form.append("gender", formData.gender);
  form.append("phone_number", formData.phone_number);
  form.append("address", formData.address);
  form.append("village", formData.village);
  form.append("subdistrict", formData.subdistrict);
  form.append("city", formData.city);
  form.append("province", formData.province);
  form.append("country", formData.country);
  form.append("postal_code", formData.postal_code);
  form.append("role", "buyer"); // hardcoded sesuai API
  form.append("kyc_type_personal", "ktp");
  form.append("company_name", formData.company_name);
  form.append("kyc_type_company", "company_document");

  if (formData.kyc_proof_file_personal)
    form.append("kyc_proof_file_personal", formData.kyc_proof_file_personal);

  if (formData.kyc_proof_file_company)
    form.append("kyc_proof_file_company", formData.kyc_proof_file_company);

  try {
  const response = await fetch("http://localhost:8000/api/auth/register", {
    method: "POST",
    body: form,
  });

  if (!response.ok) {
    const data = await response.json();

    const errorMessages = Object.entries(data.errors || {})
      .map(([field, messages]) => {
        const joined = Array.isArray(messages) ? messages.join(", ") : messages;
        return `${field}: ${joined}`;
      })
      .join("\n");

    throw new Error(errorMessages || data.message || "Registration failed");
  }

  // ✅ hanya kalau benar-benar sukses
  toast({
    title: "Success",
    description: "Company registration completed successfully!",
  });

} catch (error: any) {
  toast({
    title: "Registration Failed",
    description: error.message || "Something went wrong.",
    variant: "destructive",
  });
}

};

  const handleStep2Submit = async(e: React.FormEvent) => {
    const navigate = useNavigate();

    e.preventDefault();
    // Here you would typically submit to your backend
    await submitToBackend();
    // toast({
    //   title: "Success",
    //   description: "Company registration completed successfully!",
    // });
    navigate("/login-company"); 
  };

  const renderStep1 = () => (
    <form onSubmit={handleStep1Submit} className="space-y-4">
      <div>
        <Label htmlFor="username">Username *</Label>
        <Input
          id="username"
          type="text"
          value={formData.username}
          onChange={(e) => handleInputChange("username", e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Password *</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="confirmPassword">Confirm Password *</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Continue to Personal Information
      </Button>
    </form>
  );

  const renderStep2 = () => (
    <form onSubmit={handleStep2Submit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="first_name">First Name</Label>
          <Input
            id="first_name"
            type="text"
            value={formData.first_name}
            onChange={(e) => handleInputChange("first_name", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            type="text"
            value={formData.last_name}
            onChange={(e) => handleInputChange("last_name", e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="national_id">National ID</Label>
        <Input
          id="national_id"
          type="text"
          value={formData.national_id}
          onChange={(e) => handleInputChange("national_id", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="birth_place">Birth Place</Label>
          <Input
            id="birth_place"
            type="text"
            value={formData.birth_place}
            onChange={(e) => handleInputChange("birth_place", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="birth_date">Birth Date</Label>
          <Input
            id="birth_date"
            type="date"
            value={formData.birth_date}
            onChange={(e) => handleInputChange("birth_date", e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="gender">Gender</Label>
        <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="man">Man</SelectItem>
            <SelectItem value="woman">Woman</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="phone_number">Phone Number</Label>
        <Input
          id="phone_number"
          type="tel"
          value={formData.phone_number}
          onChange={(e) => handleInputChange("phone_number", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          type="text"
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="village">Village</Label>
          <Input
            id="village"
            type="text"
            value={formData.village}
            onChange={(e) => handleInputChange("village", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="subdistrict">Subdistrict</Label>
          <Input
            id="subdistrict"
            type="text"
            value={formData.subdistrict}
            onChange={(e) => handleInputChange("subdistrict", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="province">Province</Label>
          <Input
            id="province"
            type="text"
            value={formData.province}
            onChange={(e) => handleInputChange("province", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            type="text"
            value={formData.country}
            onChange={(e) => handleInputChange("country", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="postal_code">Postal Code</Label>
          <Input
            id="postal_code"
            type="text"
            value={formData.postal_code}
            onChange={(e) => handleInputChange("postal_code", e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="kyc_proof_file_personal">Identity Verification Document</Label>
        <Input
          id="kyc_proof_file_personal"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        />
      </div>

      <div>
        <Label htmlFor="company_name">Company Name</Label>
        <Input
          id="company_name"
          type="text"
          value={formData.company_name}
          onChange={(e) => handleInputChange("company_name", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="kyc_proof_file_company">Company Verification Document</Label>
        <Input
          id="kyc_proof_file_company"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        />
      </div>

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-full">
          Back
        </Button>
        <Button type="submit" className="w-full">
          Complete Registration
        </Button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Registration</CardTitle>
          <CardDescription>
            Step {step} of 2: {step === 1 ? "Account Information" : "Personal Information"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 ? renderStep1() : renderStep2()}
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login-company" className="text-primary hover:underline">
                {/* harusnya login dulu baru ke dashboard */}
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterCompany;