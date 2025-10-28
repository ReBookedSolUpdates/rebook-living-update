import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Trash2, Eye, Search } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const AccommodationsTab = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState<any>(null);

  const { data: accommodations, isLoading } = useQuery({
    queryKey: ["admin-accommodations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("accommodations")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("accommodations")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-accommodations"] });
      toast.success("Accommodation deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete accommodation");
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, newStatus }: { id: string; newStatus: string }) => {
      const { error } = await supabase
        .from("accommodations")
        .update({ status: newStatus })
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-accommodations"] });
      toast.success("Status updated successfully");
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (accommodation: any) => {
      const { error } = await supabase
        .from("accommodations")
        .update(accommodation)
        .eq("id", accommodation.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-accommodations"] });
      toast.success("Accommodation updated successfully");
      setEditDialogOpen(false);
    },
    onError: () => {
      toast.error("Failed to update accommodation");
    },
  });

  const handleEdit = (acc: any) => {
    setSelectedAccommodation(acc);
    setEditDialogOpen(true);
  };

  const handleView = (acc: any) => {
    setSelectedAccommodation(acc);
    setViewDialogOpen(true);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(selectedAccommodation);
  };

  const filteredAccommodations = accommodations?.filter((acc) =>
    acc.property_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    acc.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    acc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Accommodations</h2>
        <p className="text-sm text-muted-foreground">{accommodations?.length || 0} total</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search accommodations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>NSFAS</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccommodations?.map((acc) => (
              <TableRow key={acc.id}>
                <TableCell className="font-medium">{acc.property_name}</TableCell>
                <TableCell>{acc.type}</TableCell>
                <TableCell>{acc.city}</TableCell>
                <TableCell>R{acc.monthly_cost?.toLocaleString()}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      toggleStatusMutation.mutate({
                        id: acc.id,
                        newStatus: acc.status === "active" ? "inactive" : "active",
                      })
                    }
                  >
                    <Badge variant={acc.status === "active" ? "default" : "secondary"}>
                      {acc.status}
                    </Badge>
                  </Button>
                </TableCell>
                <TableCell>
                  {acc.nsfas_accredited ? (
                    <Badge variant="default" className="bg-accent">Yes</Badge>
                  ) : (
                    <Badge variant="secondary">No</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleView(acc)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(acc)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteMutation.mutate(acc.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Accommodation</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="property_name">Property Name</Label>
                <Input
                  id="property_name"
                  value={selectedAccommodation?.property_name || ""}
                  onChange={(e) => setSelectedAccommodation({ ...selectedAccommodation, property_name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={selectedAccommodation?.type || ""}
                  onValueChange={(value) => setSelectedAccommodation({ ...selectedAccommodation, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="House">House</SelectItem>
                    <SelectItem value="Residence">Residence</SelectItem>
                    <SelectItem value="Room">Room</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthly_cost">Monthly Cost</Label>
                <Input
                  id="monthly_cost"
                  type="number"
                  value={selectedAccommodation?.monthly_cost || ""}
                  onChange={(e) => setSelectedAccommodation({ ...selectedAccommodation, monthly_cost: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rooms_available">Rooms Available</Label>
                <Input
                  id="rooms_available"
                  type="number"
                  value={selectedAccommodation?.rooms_available || ""}
                  onChange={(e) => setSelectedAccommodation({ ...selectedAccommodation, rooms_available: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="units">Units</Label>
                <Input
                  id="units"
                  type="number"
                  value={selectedAccommodation?.units || ""}
                  onChange={(e) => setSelectedAccommodation({ ...selectedAccommodation, units: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={selectedAccommodation?.city || ""}
                  onChange={(e) => setSelectedAccommodation({ ...selectedAccommodation, city: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="province">Province</Label>
                <Input
                  id="province"
                  value={selectedAccommodation?.province || ""}
                  onChange={(e) => setSelectedAccommodation({ ...selectedAccommodation, province: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="university">University</Label>
                <Input
                  id="university"
                  value={selectedAccommodation?.university || ""}
                  onChange={(e) => setSelectedAccommodation({ ...selectedAccommodation, university: e.target.value })}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={selectedAccommodation?.address || ""}
                  onChange={(e) => setSelectedAccommodation({ ...selectedAccommodation, address: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={selectedAccommodation?.description || ""}
                  onChange={(e) => setSelectedAccommodation({ ...selectedAccommodation, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_person">Contact Person</Label>
                <Input
                  id="contact_person"
                  value={selectedAccommodation?.contact_person || ""}
                  onChange={(e) => setSelectedAccommodation({ ...selectedAccommodation, contact_person: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_email">Contact Email</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={selectedAccommodation?.contact_email || ""}
                  onChange={(e) => setSelectedAccommodation({ ...selectedAccommodation, contact_email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_phone">Contact Phone</Label>
                <Input
                  id="contact_phone"
                  value={selectedAccommodation?.contact_phone || ""}
                  onChange={(e) => setSelectedAccommodation({ ...selectedAccommodation, contact_phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={selectedAccommodation?.website || ""}
                  onChange={(e) => setSelectedAccommodation({ ...selectedAccommodation, website: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedAccommodation?.property_name}</DialogTitle>
            <DialogDescription>{selectedAccommodation?.type}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">City</p>
                <p>{selectedAccommodation?.city || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Province</p>
                <p>{selectedAccommodation?.province || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Cost</p>
                <p>R{selectedAccommodation?.monthly_cost?.toLocaleString() || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rooms Available</p>
                <p>{selectedAccommodation?.rooms_available || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Units</p>
                <p>{selectedAccommodation?.units || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">University</p>
                <p>{selectedAccommodation?.university || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">NSFAS Accredited</p>
                <Badge variant={selectedAccommodation?.nsfas_accredited ? "default" : "secondary"}>
                  {selectedAccommodation?.nsfas_accredited ? "Yes" : "No"}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <Badge variant={selectedAccommodation?.status === "active" ? "default" : "secondary"}>
                  {selectedAccommodation?.status}
                </Badge>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Address</p>
              <p>{selectedAccommodation?.address}</p>
            </div>
            {selectedAccommodation?.description && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Description</p>
                <p className="text-sm">{selectedAccommodation?.description}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Contact Person</p>
                <p>{selectedAccommodation?.contact_person || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Contact Email</p>
                <p>{selectedAccommodation?.contact_email || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Contact Phone</p>
                <p>{selectedAccommodation?.contact_phone || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Website</p>
                <p>{selectedAccommodation?.website || "N/A"}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccommodationsTab;
