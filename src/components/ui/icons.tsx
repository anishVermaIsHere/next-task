import {
  LucideProps,
  Plus,
  Trash,
  CircleCheck,
  CircleX,
  Pencil,
  File,
  type XIcon as LucideIcon,
} from "lucide-react";

export type Icon = typeof LucideIcon;

export const Icons = {
  plus: (props: LucideProps) => (<Plus {...props}/>),
  trash: (props: LucideProps) => (<Trash {...props}/>),
  circlecheck: (props: LucideProps) => (<CircleCheck {...props}/>),
  circlexcheck: (props: LucideProps) => (<CircleX {...props}/>),
  pencil: (props: LucideProps) => (<Pencil {...props}/>),
  file: (props: LucideProps) => (<File {...props}/>),
  
};
