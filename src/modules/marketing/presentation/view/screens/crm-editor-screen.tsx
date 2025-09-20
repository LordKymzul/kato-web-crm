"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp, Upload } from "lucide-react"

interface CrmSection {
    id: string
    title: string
    status: "submitted" | "not_submitted"
    lastEntry?: string
}

const CrmEditorScreen = () => {
    const [expandedSection, setExpandedSection] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        imageUrl: "",
        title: "",
        backgroundColor: "",
        clickthroughUrl: ""
    })

    const crmSections: CrmSection[] = [
        { id: "crm-banner", title: "CRM Banner", status: "not_submitted", lastEntry: "Showing last entry" },
        { id: "announcements", title: "Announcements", status: "not_submitted" },
        { id: "analysis", title: "Analysis", status: "not_submitted" },
        { id: "education", title: "Education", status: "not_submitted" },
        { id: "deposit-page", title: "Deposit Page Placement", status: "not_submitted" },
        { id: "withdrawal-page", title: "Withdrawal Page Placement", status: "not_submitted" },
        { id: "popup", title: "Popup", status: "not_submitted" },
        { id: "code-generator", title: "Code Generator", status: "not_submitted" }
    ]

    const handleSectionClick = (sectionId: string) => {
        setExpandedSection(expandedSection === sectionId ? null : sectionId)
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSubmit = () => {
        console.log("Submitting form data:", formData)
        // Here you would submit the form data
    }

    const handleUpload = () => {
        console.log("Upload clicked")
        // Here you would handle file upload
    }

    const renderExpandedSection = (section: CrmSection) => {
        if (expandedSection !== section.id) return null

        return (
            <div className="bg-muted/30 p-6">
                {/* Preview Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Preview</h3>
                    <div className="text-sm font-medium mb-2">{section.title}</div>
                    
                    <Card className="mb-4">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>💬 Comments</span>
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                                {section.lastEntry || "No entries yet"}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Inputs Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Inputs</h3>
                    <div className="text-sm font-medium mb-4">{section.title}</div>
                    
                    <Card className="mb-4">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                <span>💬 Comments</span>
                            </div>
                            <div className="text-sm text-gray-600">
                                Please do not re-submit or submit EMPTY fields. All fields are required.
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-4">
                        {/* Upload Image */}
                        <div className="flex items-center gap-4">
                            <label className="text-sm font-medium min-w-[120px]">Upload Image:</label>
                            <input 
                                type="file" 
                                className="flex-1"
                                accept="image/*"
                            />
                            <Button 
                                onClick={handleUpload}
                                variant="default"
                                size="sm"
                                className="px-6"
                            >
                                Upload
                            </Button>
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Image URL:</label>
                            <Input 
                                value={formData.imageUrl}
                                onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                                className="w-full"
                                placeholder="Enter image URL"
                            />
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Title:</label>
                            <Input 
                                value={formData.title}
                                onChange={(e) => handleInputChange("title", e.target.value)}
                                className="w-full"
                                placeholder="Enter title"
                            />
                        </div>

                        {/* Background Color */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Background Color:</label>
                            <Input 
                                value={formData.backgroundColor}
                                onChange={(e) => handleInputChange("backgroundColor", e.target.value)}
                                className="w-full"
                                placeholder="Enter background color"
                            />
                        </div>

                        {/* Clickthrough URL */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Clickthrough URL:</label>
                            <Input 
                                value={formData.clickthroughUrl}
                                onChange={(e) => handleInputChange("clickthroughUrl", e.target.value)}
                                className="w-full"
                                placeholder="Enter clickthrough URL"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-4">
                            <Button 
                                onClick={handleSubmit}
                                variant="default"
                                size="sm"
                                className="px-8"
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 bg-background h-full">
            <div className="max-w-6xl">
                <div className="space-y-3">
                    {crmSections.map((section) => (
                        <div key={section.id} className="bg-card text-card-foreground rounded-xl border overflow-hidden">
                            {/* Section Header */}
                            <div 
                                className="bg-card border-b p-4 cursor-pointer flex items-center justify-between hover:bg-muted/50 transition-colors"
                                onClick={() => handleSectionClick(section.id)}
                            >
                                <div className="flex items-center gap-4">
                                    <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
                                    <Badge 
                                        variant="secondary" 
                                        className="bg-muted text-muted-foreground"
                                    >
                                        {section.status === "submitted" ? "Submitted" : "Not Submitted"}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                    {expandedSection === section.id ? (
                                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                    )}
                                </div>
                            </div>

                            {/* Expanded Content */}
                            {renderExpandedSection(section)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CrmEditorScreen 