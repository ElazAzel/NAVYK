import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface Skill {
  id: string;
  name: string;
}

interface JobFormProps {
  initialData?: {
    id?: string;
    title: string;
    company: string;
    location: string;
    locationType: "remote" | "hybrid" | "office";
    employmentType: "full-time" | "part-time" | "internship" | "contract";
    experienceLevel: string;
    salaryMin: string;
    salaryMax: string;
    salaryCurrency: string;
    skills: Skill[];
    description: string;
    responsibilities: string;
    requirements: string;
    benefits: string;
    applicationDeadline: string;
    applicationEmail: string;
    applicationUrl: string;
    isPublished: boolean;
  };
  mode: "create" | "edit";
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const defaultJobData = {
  title: "",
  company: "",
  location: "",
  locationType: "office" as const,
  employmentType: "full-time" as const,
  experienceLevel: "",
  salaryMin: "",
  salaryMax: "",
  salaryCurrency: "KZT",
  skills: [],
  description: "",
  responsibilities: "",
  requirements: "",
  benefits: "",
  applicationDeadline: "",
  applicationEmail: "",
  applicationUrl: "",
  isPublished: false,
};

const JobForm: React.FC<JobFormProps> = ({
  initialData = defaultJobData,
  mode = "create",
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState(initialData);
  const [newSkill, setNewSkill] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState("basic");
  const [previewMode, setPreviewMode] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Очистка ошибки при вводе
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Очистка ошибки при выборе
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    
    // Проверка на дубликаты
    if (formData.skills.some(skill => skill.name.toLowerCase() === newSkill.trim().toLowerCase())) {
      setNewSkill("");
      return;
    }
    
    const newSkillItem = {
      id: Date.now().toString(),
      name: newSkill.trim(),
    };
    
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkillItem],
    }));
    
    setNewSkill("");
  };

  const removeSkill = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Обязательные поля
    if (!formData.title.trim()) newErrors.title = "Введите название вакансии";
    if (!formData.location.trim()) newErrors.location = "Укажите местоположение";
    if (!formData.description.trim()) newErrors.description = "Добавьте описание вакансии";
    if (!formData.requirements.trim()) newErrors.requirements = "Укажите требования к кандидату";
    
    // Проверка зарплаты
    if (formData.salaryMin && formData.salaryMax) {
      const min = parseFloat(formData.salaryMin);
      const max = parseFloat(formData.salaryMax);
      if (min > max) {
        newErrors.salaryMin = "Минимальная зарплата не может быть больше максимальной";
      }
    }
    
    // Проверка email
    if (formData.applicationEmail && !/^\S+@\S+\.\S+$/.test(formData.applicationEmail)) {
      newErrors.applicationEmail = "Введите корректный email";
    }
    
    // Проверка URL
    if (formData.applicationUrl && !/^https?:\/\/\S+$/.test(formData.applicationUrl)) {
      newErrors.applicationUrl = "Введите корректный URL";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    } else {
      // Переключение на вкладку с ошибками
      if (errors.title || errors.location || errors.employmentType || errors.experienceLevel) {
        setActiveTab("basic");
      } else if (errors.description || errors.responsibilities || errors.requirements || errors.benefits) {
        setActiveTab("description");
      } else if (errors.applicationDeadline || errors.applicationEmail || errors.applicationUrl) {
        setActiveTab("application");
      }
    }
  };

  return (
    <div className="container py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>{mode === "create" ? "Создание вакансии" : "Редактирование вакансии"}</CardTitle>
          <CardDescription>
            {mode === "create" 
              ? "Заполните информацию о новой вакансии или стажировке" 
              : "Внесите изменения в вакансию"}
          </CardDescription>
        </CardHeader>

        <div className="px-6">
          <div className="flex justify-between items-center mb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Основное</TabsTrigger>
                <TabsTrigger value="description">Описание</TabsTrigger>
                <TabsTrigger value="skills">Навыки</TabsTrigger>
                <TabsTrigger value="application">Заявка</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <TabsContent value="basic">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Название вакансии <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Например: Frontend-разработчик"
                    className={errors.title ? "border-red-500" : ""}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">
                    Компания
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Название вашей компании"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">
                      Местоположение <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Например: Алматы"
                      className={errors.location ? "border-red-500" : ""}
                    />
                    {errors.location && (
                      <p className="text-red-500 text-sm">{errors.location}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="locationType">
                      Формат работы <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.locationType}
                      onValueChange={(value) => handleSelectChange("locationType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите формат работы" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="office">Офис</SelectItem>
                        <SelectItem value="remote">Удаленно</SelectItem>
                        <SelectItem value="hybrid">Гибридный</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employmentType">
                      Тип занятости <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.employmentType}
                      onValueChange={(value) => handleSelectChange("employmentType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип занятости" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Полная занятость</SelectItem>
                        <SelectItem value="part-time">Частичная занятость</SelectItem>
                        <SelectItem value="internship">Стажировка</SelectItem>
                        <SelectItem value="contract">Контракт</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experienceLevel">
                      Опыт работы
                    </Label>
                    <Select
                      value={formData.experienceLevel}
                      onValueChange={(value) => handleSelectChange("experienceLevel", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите требуемый опыт" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="No experience">Без опыта</SelectItem>
                        <SelectItem value="1-3 years">1-3 года</SelectItem>
                        <SelectItem value="3-5 years">3-5 лет</SelectItem>
                        <SelectItem value="5+ years">5+ лет</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Зарплата</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Input
                        id="salaryMin"
                        name="salaryMin"
                        type="number"
                        value={formData.salaryMin}
                        onChange={handleInputChange}
                        placeholder="От"
                        className={errors.salaryMin ? "border-red-500" : ""}
                      />
                      {errors.salaryMin && (
                        <p className="text-red-500 text-sm">{errors.salaryMin}</p>
                      )}
                    </div>
                    <div>
                      <Input
                        id="salaryMax"
                        name="salaryMax"
                        type="number"
                        value={formData.salaryMax}
                        onChange={handleInputChange}
                        placeholder="До"
                      />
                    </div>
                    <div>
                      <Select
                        value={formData.salaryCurrency}
                        onValueChange={(value) => handleSelectChange("salaryCurrency", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Валюта" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="KZT">₸ (KZT)</SelectItem>
                          <SelectItem value="USD">$ (USD)</SelectItem>
                          <SelectItem value="EUR">€ (EUR)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="description">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Описание вакансии <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Расскажите о позиции и компании"
                    className={`min-h-32 ${errors.description ? "border-red-500" : ""}`}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsibilities">
                    Обязанности
                  </Label>
                  <Textarea
                    id="responsibilities"
                    name="responsibilities"
                    value={formData.responsibilities}
                    onChange={handleInputChange}
                    placeholder="Опишите основные задачи и обязанности"
                    className="min-h-24"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">
                    Требования <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    placeholder="Укажите необходимые навыки и опыт"
                    className={`min-h-24 ${errors.requirements ? "border-red-500" : ""}`}
                  />
                  {errors.requirements && (
                    <p className="text-red-500 text-sm">{errors.requirements}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="benefits">
                    Что мы предлагаем
                  </Label>
                  <Textarea
                    id="benefits"
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleInputChange}
                    placeholder="Опишите преимущества работы в вашей компании (страховка, питание, обучение и т.д.)"
                    className="min-h-24"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="skills">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Необходимые навыки</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Добавить навык"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                    />
                    <Button type="button" onClick={addSkill}>
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {formData.skills.map((skill) => (
                    <Badge key={skill.id} variant="secondary" className="pl-2 pr-1 py-1">
                      {skill.name}
                      <button
                        type="button"
                        className="ml-1 hover:bg-muted rounded-full p-1"
                        onClick={() => removeSkill(skill.id)}
                        aria-label={`Удалить навык ${skill.name}`}
                      >
                        <XMarkIcon className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {formData.skills.length === 0 && (
                    <div className="text-sm text-muted-foreground">
                      Добавьте навыки, которыми должен обладать кандидат.
                    </div>
                  )}
                </div>

                <div className="mt-6 border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Популярные навыки в Казахстане</h3>
                  <div className="flex flex-wrap gap-2">
                    {["JavaScript", "React", "Node.js", "TypeScript", "Git", "SQL", "Python", "Java", "HTML", "CSS", "1C", "Kaspi Pay", "BPM'online"].map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-secondary"
                        onClick={() => {
                          if (!formData.skills.some(s => s.name === skill)) {
                            setFormData(prev => ({
                              ...prev,
                              skills: [...prev.skills, { id: Date.now().toString(), name: skill }]
                            }));
                          }
                        }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="application">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="applicationDeadline">
                    Срок приема заявок
                  </Label>
                  <Input
                    id="applicationDeadline"
                    name="applicationDeadline"
                    type="date"
                    value={formData.applicationDeadline}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="applicationEmail">
                    Email для заявок
                  </Label>
                  <Input
                    id="applicationEmail"
                    name="applicationEmail"
                    type="email"
                    value={formData.applicationEmail}
                    onChange={handleInputChange}
                    placeholder="hr@company.kz"
                    className={errors.applicationEmail ? "border-red-500" : ""}
                  />
                  {errors.applicationEmail && (
                    <p className="text-red-500 text-sm">{errors.applicationEmail}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="applicationUrl">
                    URL для отправки заявок
                  </Label>
                  <Input
                    id="applicationUrl"
                    name="applicationUrl"
                    value={formData.applicationUrl}
                    onChange={handleInputChange}
                    placeholder="https://company.kz/careers/apply"
                    className={errors.applicationUrl ? "border-red-500" : ""}
                  />
                  {errors.applicationUrl && (
                    <p className="text-red-500 text-sm">{errors.applicationUrl}</p>
                  )}
                </div>

                <div className="flex items-center space-x-2 pt-4">
                  <Checkbox
                    id="isPublished"
                    checked={formData.isPublished}
                    onCheckedChange={(checked) => handleCheckboxChange("isPublished", checked as boolean)}
                  />
                  <label
                    htmlFor="isPublished"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Опубликовать вакансию сразу
                  </label>
                </div>
              </div>
            </TabsContent>
          </form>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onCancel}>
            Отмена
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
              {previewMode ? "Редактировать" : "Предпросмотр"}
            </Button>
            <Button onClick={handleSubmit}>
              {mode === "create" ? "Создать вакансию" : "Сохранить изменения"}
            </Button>
          </div>
        </CardFooter>
      </Card>

      {previewMode && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Предпросмотр вакансии</CardTitle>
            <CardDescription>Так вакансия будет отображаться для студентов</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">{formData.title || "Название вакансии"}</h2>
                <div className="flex items-center mt-2 text-muted-foreground">
                  <span>{formData.company || "Название компании"}</span>
                  <span className="mx-2">•</span>
                  <span>{formData.location || "Местоположение"}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">
                  {formData.locationType === "remote" ? "Удаленно" : 
                   formData.locationType === "hybrid" ? "Гибридный" : 
                   "Офис"}
                </Badge>
                <Badge variant="outline">
                  {formData.employmentType === "full-time" ? "Полная занятость" : 
                   formData.employmentType === "part-time" ? "Частичная занятость" : 
                   formData.employmentType === "internship" ? "Стажировка" : 
                   "Контракт"}
                </Badge>
                {formData.experienceLevel && (
                  <Badge variant="outline">
                    Опыт: {formData.experienceLevel}
                  </Badge>
                )}
                {(formData.salaryMin || formData.salaryMax) && (
                  <Badge variant="outline">
                    {formData.salaryMin && formData.salaryMax 
                      ? `${formData.salaryMin} - ${formData.salaryMax} ${formData.salaryCurrency}`
                      : formData.salaryMin 
                        ? `От ${formData.salaryMin} ${formData.salaryCurrency}`
                        : `До ${formData.salaryMax} ${formData.salaryCurrency}`
                    }
                  </Badge>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Описание</h3>
                  <p className="whitespace-pre-line">{formData.description || "Описание вакансии отсутствует."}</p>
                </div>

                {formData.responsibilities && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Обязанности</h3>
                    <p className="whitespace-pre-line">{formData.responsibilities}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-medium mb-2">Требования</h3>
                  <p className="whitespace-pre-line">{formData.requirements || "Требования не указаны."}</p>
                </div>

                {formData.benefits && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Что мы предлагаем</h3>
                    <p className="whitespace-pre-line">{formData.benefits}</p>
                  </div>
                )}

                {formData.skills.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Навыки</h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill) => (
                        <Badge key={skill.id} variant="secondary">
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {formData.applicationDeadline && (
                  <div className="text-sm text-muted-foreground">
                    Заявки до: {formData.applicationDeadline}
                  </div>
                )}
              </div>

              <div className="pt-4">
                <Button className="w-full">Откликнуться</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JobForm; 