import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/dropdown-menu';
import {
  FiChevronDown,
  FiChevronRight,
  FiFile,
  FiMoreHorizontal,
  FiPlus,
  FiTrash2,
} from 'react-icons/fi';
import Item from '../SideBar/Item';
import type { Note } from '../../modules/notes/note.entity';
import React, { useState } from 'react';
import type { IconType } from 'react-icons';

// NoteItemが受け取るpropsを定義。
interface Props {
  note: Note;
  onCreate?: (event: React.MouseEvent) => void;
  // ノートの子ノートを開く
  onExpand?: (event: React.MouseEvent) => void;
  // 何階層目のノートか受け取れるようにした
  layer?: number;
  // 開閉状態を受け取れるようにした
  expanded?: boolean;
  //親からonClickを受け取れるようにした。ノート行全体をクリックしたら詳細ページへ遷移する用
  onClick: () => void;
}

export default function NoteItem({
  note,
  onCreate,
  onExpand,
  layer = 0,
  // expandedが渡されなければ閉じているようにする
  expanded = false,
  onClick,
}: Props) {
  // ノート項目にマウスがホバーしてるか
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = (): IconType => {
    return expanded ? FiChevronDown : isHovered ? FiChevronRight : FiFile;
  };

  const menu = (
    <div className="note-item-menu-container">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="note-item-menu-button" role="button">
            <FiMoreHorizontal className="note-item-menu-icon" size={16} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="note-item-dropdown"
          align="start"
          side="right"
          forceMount
        >
          <DropdownMenuItem onClick={() => {}}>
            <FiTrash2 className="note-item-delete-icon" size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="note-item-menu-button" role="button" onClick={onCreate}>
        <FiPlus className="note-item-menu-icon" size={16} />
      </div>
    </div>
  );

  return (
    <div
      role="button"
      // 階層に応じて余白を増やす
      style={{ paddingLeft: `${layer * 12 + 12}px` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <Item
        label={note.title ?? '無題'}
        icon={getIcon()}
        trailingItem={menu}
        // アイコンをクリックしたら親から渡されたonExpandを実行する
        onIconClick={onExpand}
      />
    </div>
  );
}
