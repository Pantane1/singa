interface PlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => void;
}

export const PlaylistModal = ({ isOpen, onClose, onCreate }: PlaylistModalProps) => {
  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const description = (form.elements.namedItem('description') as HTMLInputElement).value;
    if (!name.trim()) {
      return;
    }
    onCreate(name.trim(), description.trim());
    onClose();
    form.reset();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
        <h3 className="text-xl font-semibold text-white">Create playlist</h3>
        <p className="mt-2 text-sm text-slate-400">Collect your favorite songs into a custom listening session.</p>
        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <input name="name" className="w-full rounded-2xl border border-white/10 bg-slate-800 px-3 py-2 text-white outline-none" placeholder="Playlist name" />
          <textarea name="description" className="min-h-24 w-full rounded-2xl border border-white/10 bg-slate-800 px-3 py-2 text-white outline-none" placeholder="What is this playlist about?" />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-full px-4 py-2 text-sm text-slate-300">
              Cancel
            </button>
            <button type="submit" className="rounded-full bg-fuchsia-600 px-4 py-2 text-sm font-semibold text-white">
              Save playlist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
