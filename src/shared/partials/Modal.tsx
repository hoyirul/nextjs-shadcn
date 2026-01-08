import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "components/ui/dialog"

interface ModalProps {
  isOpen: boolean
  title: string
  description?: string
  onClose: () => void
  children: React.ReactNode
  maxWidth?: string
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  description,
  onClose,
  children,
  maxWidth = "max-w-xl"
}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className={maxWidth}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>
      {children}
    </DialogContent>
  </Dialog>
)
