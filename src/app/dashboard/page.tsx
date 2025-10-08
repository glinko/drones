'use client'

import { useState, useEffect } from 'react'
import { 
  ShareIcon, 
  PencilIcon, 
  CheckIcon, 
  XMarkIcon,
  PhotoIcon,
  VideoCameraIcon,
  PlusIcon
} from '@heroicons/react/24/outline'

interface Project {
  id: string
  name: string
  createdAt: string
  mediaCount: number
}

interface Media {
  id: string
  type: 'photo' | 'video'
  filename: string
  thumbnailUrl?: string
  size: number
  createdAt: string
  duration?: number
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [media, setMedia] = useState<Media[]>([])
  const [isEditingProjectName, setIsEditingProjectName] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [showShareModal, setShowShareModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Mock data for development
  useEffect(() => {
    const mockProjects: Project[] = [
      {
        id: '1',
        name: 'Luxury Estate Photography',
        createdAt: '2024-01-15',
        mediaCount: 24
      },
      {
        id: '2',
        name: 'Construction Progress - Downtown Office',
        createdAt: '2024-01-10',
        mediaCount: 18
      },
      {
        id: '3',
        name: 'Wedding Venue - Garden Estate',
        createdAt: '2024-01-05',
        mediaCount: 12
      }
    ]

    const mockMedia: Media[] = [
      {
        id: '1',
        type: 'photo',
        filename: 'estate_aerial_001.jpg',
        size: 2048000,
        createdAt: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        type: 'video',
        filename: 'estate_tour_001.mp4',
        size: 15728640,
        duration: 120,
        createdAt: '2024-01-15T10:35:00Z'
      },
      {
        id: '3',
        type: 'photo',
        filename: 'estate_aerial_002.jpg',
        size: 1920000,
        createdAt: '2024-01-15T10:40:00Z'
      }
    ]

    setProjects(mockProjects)
    setSelectedProject(mockProjects[0])
    setProjectName(mockProjects[0].name)
    setMedia(mockMedia)
    setIsLoading(false)
  }, [])

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project)
    setProjectName(project.name)
    setIsEditingProjectName(false)
    // TODO: Load media for selected project
  }

  const handleSaveProjectName = async () => {
    if (!selectedProject || !projectName.trim()) return

    try {
      // TODO: Implement API call to update project name
      console.log('Updating project name:', projectName)
      
      setSelectedProject({ ...selectedProject, name: projectName })
      setProjects(projects.map(p => 
        p.id === selectedProject.id ? { ...p, name: projectName } : p
      ))
      setIsEditingProjectName(false)
    } catch (error) {
      console.error('Error updating project name:', error)
    }
  }

  const handleShareProject = async (emails: string[]) => {
    if (!selectedProject) return

    try {
      // TODO: Implement API call to send invitations
      console.log('Sharing project:', selectedProject.id, emails)
      setShowShareModal(false)
    } catch (error) {
      console.error('Error sharing project:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            My Projects
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            className="btn-primary"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            New Project
          </button>
        </div>
      </div>

      {/* 3-Frame Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        
        {/* Top Frame - Project Selector and Share */}
        <div className="lg:col-span-4 frame-container p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <label htmlFor="project-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select Project
              </label>
              <select
                id="project-select"
                value={selectedProject?.id || ''}
                onChange={(e) => {
                  const project = projects.find(p => p.id === e.target.value)
                  if (project) handleProjectSelect(project)
                }}
                className="input-field max-w-md"
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-4">
              {selectedProject && (
                <div className="flex items-center gap-2">
                  {isEditingProjectName ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="input-field"
                        autoFocus
                      />
                      <button
                        onClick={handleSaveProjectName}
                        className="p-1 text-green-600 hover:text-green-800"
                      >
                        <CheckIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setIsEditingProjectName(false)
                          setProjectName(selectedProject.name)
                        }}
                        className="p-1 text-red-600 hover:text-red-800"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {selectedProject.name}
                      </h3>
                      <button
                        onClick={() => setIsEditingProjectName(true)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              <button
                onClick={() => setShowShareModal(true)}
                className="btn-primary"
                disabled={!selectedProject}
              >
                <ShareIcon className="h-4 w-4 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Middle Frame - Photos */}
        <div className="lg:col-span-2 frame-container p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <PhotoIcon className="h-5 w-5 mr-2" />
              Photos ({media.filter(m => m.type === 'photo').length})
            </h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {media.filter(m => m.type === 'photo').map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <PhotoIcon className="h-8 w-8 text-gray-400" />
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.filename}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(item.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Frame - Videos */}
        <div className="lg:col-span-2 frame-container p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <VideoCameraIcon className="h-5 w-5 mr-2" />
              Videos ({media.filter(m => m.type === 'video').length})
            </h3>
          </div>
          
          <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
            {media.filter(m => m.type === 'video').map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative">
                  <div className="w-full h-full flex items-center justify-center">
                    <VideoCameraIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  {item.duration && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {Math.floor(item.duration / 60)}:{(item.duration % 60).toString().padStart(2, '0')}
                    </div>
                  )}
                </div>
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.filename}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(item.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && selectedProject && (
        <ShareModal
          projectName={selectedProject.name}
          onClose={() => setShowShareModal(false)}
          onShare={handleShareProject}
        />
      )}
    </div>
  )
}

// Share Modal Component
function ShareModal({ 
  projectName, 
  onClose, 
  onShare 
}: { 
  projectName: string
  onClose: () => void
  onShare: (emails: string[]) => void
}) {
  const [emails, setEmails] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const emailList = emails.split(',').map(email => email.trim()).filter(email => email)
    if (emailList.length > 0) {
      onShare(emailList)
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Share "{projectName}"
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="emails" className="block text-sm font-medium text-gray-700">
                Email addresses (comma-separated)
              </label>
              <textarea
                id="emails"
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                className="mt-1 input-field"
                rows={3}
                placeholder="user1@example.com, user2@example.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message (optional)
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 input-field"
                rows={3}
                placeholder="Add a personal message..."
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Send Invitations
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
