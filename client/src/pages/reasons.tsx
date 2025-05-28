import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Plus, Trash2, Heart } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { queryClient } from "@/lib/queryClient";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Reason {
  id: number;
  userId: number;
  title: string;
  description: string;
  createdAt: string;
}

export default function ReasonsPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const { data: reasons, isLoading } = useQuery<Reason[]>({
    queryKey: ['/api/reasons'],
  });

  const addReasonMutation = useMutation({
    mutationFn: async (reason: { title: string; description: string }) => {
      const response = await fetch('/api/reasons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reason),
      });
      if (!response.ok) throw new Error('Failed to add reason');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/reasons'] });
      setNewTitle("");
      setNewDescription("");
      setIsDialogOpen(false);
      toast({
        title: t('reasonAdded'),
        description: t('reasonAddedDesc'),
      });
    },
    onError: () => {
      toast({
        title: t('error'),
        description: t('failedAddReason'),
        variant: "destructive",
      });
    },
  });

  const deleteReasonMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/reasons/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete reason');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/reasons'] });
      toast({
        title: t('reasonDeleted'),
        description: t('reasonDeletedDesc'),
      });
    },
    onError: () => {
      toast({
        title: t('error'),
        description: t('failedDeleteReason'),
        variant: "destructive",
      });
    },
  });

  const handleAddReason = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) {
      toast({
        title: t('error'),
        description: t('titleDescriptionRequired'),
        variant: "destructive",
      });
      return;
    }
    addReasonMutation.mutate({ title: newTitle, description: newDescription });
  };

  const handleDeleteReason = (id: number) => {
    deleteReasonMutation.mutate(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 4}s infinite`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-4 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-2xl font-bold text-text-primary">{t('myReasons')}</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary-light text-white rounded-full p-3">
                <Plus className="h-6 w-6" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-background-card border-background-card text-text-primary">
              <DialogHeader>
                <DialogTitle>{t('addNewReason')}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddReason}>
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Input
                      placeholder={t('reasonTitle')}
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="bg-background-primary border-background-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Textarea
                      placeholder={t('reasonDescription')}
                      rows={4}
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      className="bg-background-primary border-background-primary"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="border-background-primary text-text-secondary"
                  >
                    {t('cancel')}
                  </Button>
                  <Button
                    type="submit"
                    disabled={addReasonMutation.isPending}
                    className="bg-primary hover:bg-primary-light text-white"
                  >
                    {addReasonMutation.isPending ? t('adding') : t('add')}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Subtitle */}
        <p className="text-text-secondary mb-6">
          {t('reasonsSubtitle')}
        </p>

        {/* Reasons List */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="text-text-secondary">{t('loadingReasons')}</div>
          </div>
        ) : reasons && reasons.length > 0 ? (
          <div className="space-y-4">
            {reasons.map((reason) => (
              <div key={reason.id} className="bg-background-card p-4 rounded-xl shadow-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-text-secondary text-sm">
                      {reason.description}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteReason(reason.id)}
                    disabled={deleteReasonMutation.isPending}
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-text-secondary mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium text-text-primary mb-2">
              {t('noReasonsYet')}
            </h3>
            <p className="text-text-secondary mb-6">
              {t('addFirstReason')}
            </p>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="bg-primary hover:bg-primary-light text-white"
            >
              <Plus className="h-5 w-5 mr-2" />
              {t('addReason')}
            </Button>
          </div>
        )}
      </div>

      <Navigation currentPath="/reasons" />
    </div>
  );
}