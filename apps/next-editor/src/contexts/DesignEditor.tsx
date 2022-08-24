import React from "react"
import { Page } from "~/interfaces/DesignEditor"

interface IDesignEditorContext {
  pages: Page[]
  setPages: (value: ((prevState: Page[]) => Page[]) | Page[]) => void
  currentPage: Page | null
  setCurrentPage: (value: ((prevState: null) => null) | null) => void
}

export const DesignEditorContext = React.createContext<IDesignEditorContext>({
  pages: [],
  currentPage: null,
  setPages: () => {},
  setCurrentPage: () => {},
})

export const DesignEditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [pages, setPages] = React.useState<Page[]>([])
  const [currentPage, setCurrentPage] = React.useState(null)
  const context = {
    pages,
    setPages,
    currentPage,
    setCurrentPage,
  }
  return <DesignEditorContext.Provider value={context}>{children}</DesignEditorContext.Provider>
}
