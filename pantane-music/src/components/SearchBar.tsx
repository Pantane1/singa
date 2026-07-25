interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <label className="flex items-center gap-3 rounded-full border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-300 shadow-lg shadow-black/20 backdrop-blur">
    <span className="text-lg">⌕</span>
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search your library"
      className="w-full bg-transparent outline-none"
    />
  </label>
);
