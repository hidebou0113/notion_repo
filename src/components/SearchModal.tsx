import { useDebouncedCallback } from 'use-debounce';
import type { Note } from '../modules/notes/note.entity';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';

// 親から受け取る値
interface Props {
  isOpen: boolean;
  onClose: () => void;
  notes: Note[];
  onKeywordChange: (keyword: string) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  notes,
  onKeywordChange,
}: Props) {
  // 検索欄も1文字ごとに検索APIを叩かないように500ミリ秒待ってから検索する
  const debounced = useDebouncedCallback(onKeywordChange, 500);

  return (
    // Layoutのstateとモーダルの開閉が繋がる。
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <Command shouldFilter={false}>
        <CommandInput
          placeholder={'キーワードで検索'}
          //LayoutのsearchNotesが呼ばれる
          onValueChange={debounced}
        />
        <CommandList>
          <CommandEmpty>条件に一致するノートがありません</CommandEmpty>
          <CommandGroup>
            {/* 検索結果のnotesを1件ずつ表示 */}
            {notes.map((note) => (
              <CommandItem key={note.id} title={note.title ?? '無題'}>
                <span>{note.title ?? '無題'}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
