import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, FileText, Upload } from "lucide-react";
import { toast as sonnerToast } from "sonner";

interface Bursary {
  id: string;
  name: string;
  provider: string | null;
  description: string | null;
  amount: string | null;
  closing_date: string | null;
  status: string;
}

const BursariesTab = () => {
  const { toast } = useToast();
  const [bursaries, setBursaries] = useState<Bursary[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [csvText, setCsvText] = useState("");
  const [jsonText, setJsonText] = useState("");

  useEffect(() => {
    fetchBursaries();
  }, []);

  const fetchBursaries = async () => {
    try {
      const { data, error } = await supabase
        .from('bursaries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBursaries(data || []);
    } catch (error) {
      console.error('Error fetching bursaries:', error);
      toast({
        title: "Error",
        description: "Failed to fetch bursaries",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const parseCSV = (csv: string) => {
    const lines = csv.trim().split("\n");
    if (lines.length < 2) {
      throw new Error("CSV must have at least a header row and one data row");
    }

    const headers = lines[0].split(",").map(h => h.trim());
    const bursariesData = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map(v => v.trim());
      const bursary: any = {};

      headers.forEach((header, index) => {
        let value = values[index]?.trim();

        if (value === "NULL" || value === "null" || value === "") {
          value = null;
        }

        if (!value && (header === "id" || header === "created_at" || header === "updated_at")) {
          return;
        }

        if (header === "id") {
          return;
        } else {
          bursary[header] = value;
        }
      });

      if (!bursary.name) {
        throw new Error(`Row ${i + 1}: name is required`);
      }

      bursariesData.push(bursary);
    }

    return bursariesData;
  };

  const handleCSVSubmit = async () => {
    if (!csvText.trim()) {
      sonnerToast.error("Please enter CSV data");
      return;
    }

    setIsProcessing(true);
    try {
      const data = parseCSV(csvText);
      const { error } = await supabase
        .from("bursaries")
        .insert(data);

      if (error) throw error;

      sonnerToast.success(`Successfully added ${data.length} bursary(ies)`);
      setCsvText("");
      await fetchBursaries();
    } catch (error: any) {
      sonnerToast.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleJSONSubmit = async () => {
    if (!jsonText.trim()) {
      sonnerToast.error("Please enter JSON data");
      return;
    }

    setIsProcessing(true);
    try {
      const data = JSON.parse(jsonText);
      const bursariesArray = Array.isArray(data) ? data : [data];

      bursariesArray.forEach((bursary, index) => {
        if (!bursary.name) {
          throw new Error(`Item ${index + 1}: name is required`);
        }
      });

      const { error } = await supabase
        .from("bursaries")
        .insert(bursariesArray);

      if (error) throw error;

      sonnerToast.success(`Successfully added ${bursariesArray.length} bursary(ies)`);
      setJsonText("");
      await fetchBursaries();
    } catch (error: any) {
      sonnerToast.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this bursary?')) return;

    try {
      const { error } = await supabase
        .from('bursaries')
        .delete()
        .eq('id', id);

      if (error) throw error;

      sonnerToast.success("Bursary deleted successfully");
      await fetchBursaries();
    } catch (error) {
      console.error('Error deleting bursary:', error);
      sonnerToast.error("Failed to delete bursary");
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Bursaries Management</h2>

      <Tabs defaultValue="csv">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="csv">
            <FileText className="w-4 h-4 mr-2" />
            CSV Format
          </TabsTrigger>
          <TabsTrigger value="json">
            <Upload className="w-4 h-4 mr-2" />
            JSON Format
          </TabsTrigger>
        </TabsList>

        <TabsContent value="csv" className="space-y-4">
          <div>
            <Label htmlFor="csv-input">CSV Data</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Format: name,provider,description,amount,closing_date,status,requirements,qualifications,application_process
            </p>
            <Textarea
              id="csv-input"
              placeholder="name,provider,description,amount,closing_date,status,requirements,qualifications,application_process
Example Bursary,Provider Name,Detailed description,R50000,2024-12-31,active,South African citizen,Grade 12 pass,Apply online"
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              rows={10}
              className="font-mono text-sm"
            />
          </div>
          <Button onClick={handleCSVSubmit} disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Add from CSV"}
          </Button>
        </TabsContent>

        <TabsContent value="json" className="space-y-4">
          <div>
            <Label htmlFor="json-input">JSON Data</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Paste a JSON object or array of objects. Required field: name
            </p>
            <Textarea
              id="json-input"
              placeholder={`{
  "name": "Example Bursary",
  "provider": "Provider Name",
  "description": "Detailed description",
  "amount": "R50000",
  "closing_date": "2024-12-31",
  "status": "active",
  "requirements": "South African citizen",
  "qualifications": "Grade 12 pass",
  "application_process": "Apply online"
}`}
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              rows={15}
              className="font-mono text-sm"
            />
          </div>
          <Button onClick={handleJSONSubmit} disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Add from JSON"}
          </Button>
        </TabsContent>
      </Tabs>

      <div>
        <h3 className="text-lg font-semibold mb-4">Current Bursaries</h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Closing Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bursaries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No bursaries found. Paste CSV or JSON data to add bursaries.
                  </TableCell>
                </TableRow>
              ) : (
                bursaries.map((bursary) => (
                  <TableRow key={bursary.id}>
                    <TableCell className="font-medium">{bursary.name}</TableCell>
                    <TableCell>{bursary.provider || '-'}</TableCell>
                    <TableCell>{bursary.amount || '-'}</TableCell>
                    <TableCell>
                      {bursary.closing_date
                        ? new Date(bursary.closing_date).toLocaleDateString()
                        : '-'
                      }
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        bursary.status === 'active'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-gray-50 text-gray-700'
                      }`}>
                        {bursary.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(bursary.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default BursariesTab;
