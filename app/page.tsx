"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Copy, ChevronDown, Info, Check } from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Расширяем интерфейс Window для Яндекс Метрики
declare global {
  interface Window {
    ym: (id: number, action: string, goal?: string, params?: any) => void
    ymParams: {
      base_domain: string
      campaign_name: string
    }
  }
}

const Page = () => {
  const [protocol, setProtocol] = useState("https://")
  const [baseUrl, setBaseUrl] = useState("")
  const [fullCampaignName, setFullCampaignName] = useState("")
  const [campaignName, setCampaignName] = useState("")
  const [quickLinksOpen, setQuickLinksOpen] = useState(false)
  const [quickLinks, setQuickLinks] = useState({
    bs1: "",
    bs2: "",
    bs3: "",
    bs4: "",
    bs5: "",
    bs6: "",
    bs7: "",
    bs8: "",
  })
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({})

  const transliterate = (text: string): string => {
    const translitMap: { [key: string]: string } = {
      а: "a",
      б: "b",
      в: "v",
      г: "g",
      д: "d",
      е: "e",
      ё: "yo",
      ж: "zh",
      з: "z",
      и: "i",
      й: "y",
      к: "k",
      л: "l",
      м: "m",
      н: "n",
      о: "o",
      п: "p",
      р: "r",
      с: "s",
      т: "t",
      у: "u",
      ф: "f",
      х: "h",
      ц: "ts",
      ч: "ch",
      ш: "sh",
      щ: "sch",
      ъ: "",
      ы: "y",
      ь: "",
      э: "e",
      ю: "yu",
      я: "ya",
      А: "A",
      Б: "B",
      В: "V",
      Г: "G",
      Д: "D",
      Е: "E",
      Ё: "Yo",
      Ж: "Zh",
      З: "Z",
      И: "I",
      Й: "Y",
      К: "K",
      Л: "L",
      М: "M",
      Н: "N",
      О: "O",
      П: "P",
      Р: "R",
      С: "S",
      Т: "T",
      У: "U",
      Ф: "F",
      Х: "H",
      Ц: "Ts",
      Ч: "Ch",
      Ш: "Sh",
      Щ: "Sch",
      Ъ: "",
      Ы: "Y",
      Ь: "",
      Э: "E",
      Ю: "Yu",
      Я: "Ya",
    }

    return text
      .split("")
      .map((char) => translitMap[char] || char)
      .join("")
  }

  const processFullCampaignName = (fullName: string): string => {
    const parts = fullName.split("|").map((part) => part.trim())
    const firstThreeParts = parts.slice(0, 3).join(" ")
    const transliterated = transliterate(firstThreeParts)
    return transliterated
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
  }

  const isValidUrl = (url: string): boolean => {
    // Check if URL contains only valid characters (no Cyrillic or other invalid chars)
    const validUrlPattern = /^[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})?([/\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/
    return validUrlPattern.test(url.replace(/^https?:\/\//, ""))
  }

  useEffect(() => {
    if (baseUrl.trim()) {
      if (isValidUrl(baseUrl)) {
        // If URL is valid, always regenerate quick links to ensure they're correct
        const cleanUrl = baseUrl.replace(/^https?:\/\//, "")
        const newQuickLinks = {
          bs1: cleanUrl,
          bs2: cleanUrl,
          bs3: cleanUrl,
          bs4: cleanUrl,
          bs5: cleanUrl,
          bs6: cleanUrl,
          bs7: cleanUrl,
          bs8: cleanUrl,
        }
        setQuickLinks(newQuickLinks)
      } else {
        // If URL contains invalid characters, clear quick links
        setQuickLinks({
          bs1: "",
          bs2: "",
          bs3: "",
          bs4: "",
          bs5: "",
          bs6: "",
          bs7: "",
          bs8: "",
        })
      }
    } else {
      // If URL is empty, clear quick links
      setQuickLinks({
        bs1: "",
        bs2: "",
        bs3: "",
        bs4: "",
        bs5: "",
        bs6: "",
        bs7: "",
        bs8: "",
      })
    }
  }, [baseUrl])

  useEffect(() => {
    if (fullCampaignName.trim()) {
      const processedName = processFullCampaignName(fullCampaignName)
      setCampaignName(processedName)
    }
  }, [fullCampaignName])

  const buildUtmTail = (name: string, blok = "zagolovok") => {
    const fullCampaignName = `${name}_{campaign_id}`
    return `?utm_source=yandex&utm_medium=source_type:{source_type}|place:{source}&utm_campaign=${fullCampaignName}&utm_term=keyword:{keyword}|retargeting_id:{retargeting_id}|key_id:{phrase_id}&utm_content=gbid:{gbid}|creative_id:{creative_id}|ad_id:{ad_id}|banner_id:{banner_id}|addphrases:{addphrases}|match_type:{match_type}|matched_keyword:{matched_keyword}|coef_goal:{coef_goal_context_id}|device:{device_type}|device_id:{device_id}|position_type:{position_type}|position:{position}|blok:${blok}`
  }

  const generateUTMLink = (url: string, name: string, blok = "zagolovok") => {
    const cleanUrl = url.replace(/^https?:\/\//, "")
    return `${protocol}${cleanUrl}${buildUtmTail(name, blok)}`
  }

  const copyToClipboard = async (text: string, buttonId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedStates((prev) => ({ ...prev, [buttonId]: true }))

      // Отправляем цель копирования с параметрами
      sendYandexMetrikaGoal("link_copied", {
        button_id: buttonId,
        link_type: buttonId === "main" ? "main_link" : "quick_link",
        link_length: text.length,
        contains_utm: text.includes("utm_"),
        base_domain: baseUrl.replace(/^https?:\/\//, "")
      })

      toast({
        title: "Скопировано!",
        description: "Ссылка скопирована в буфер обмена",
        duration: 2000,
      })
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [buttonId]: false }))
      }, 2000)
    } catch (err) {
      toast({
        title: "Ошибка",
        description: "Не удалось скопировать ссылку",
        variant: "destructive",
      })
    }
  }

  const copyAllLinks = async () => {
    const mainLink = generateUTMLink(baseUrl, campaignName, "zagolovok")
    const quickLinksText = Object.entries(quickLinks)
      .filter(([_, url]) => url.trim())
      .map(([key, url]) => {
        const finalUrl = url.trim() || baseUrl
        return generateUTMLink(finalUrl, campaignName, key)
      })
      .join("\n")

    const allLinks = [mainLink, quickLinksText].filter(Boolean).join("\n")
    await copyToClipboard(allLinks, "copy-all")
  }

  // Функция для обновления параметров Яндекс Метрики
  const updateYandexMetrikaParams = () => {
    if (typeof window !== "undefined" && window.ymParams) {
      const cleanUrl = baseUrl.replace(/^https?:\/\//, "")
      window.ymParams = {
        base_domain: cleanUrl,
        campaign_name: fullCampaignName || ''
      }
    }
  }

  // Функция для отправки цели с параметрами
  const sendYandexMetrikaGoal = (goal: string, additionalParams?: any) => {
    if (typeof window !== "undefined" && window.ym) {
      updateYandexMetrikaParams()
      const params = {
        ...window.ymParams,
        ...additionalParams,
        goal_type: goal,
        timestamp: new Date().toISOString()
      }
      
      window.ym(103772260, "reachGoal", goal, params)
    }
  }

  const generateQuickLinks = () => {
    if (!isValidUrl(baseUrl)) {
      toast({
        title: "Ошибка",
        description: "Введите корректный URL для генерации быстрых ссылок",
        variant: "destructive",
      })
      return
    }

    const cleanUrl = baseUrl.replace(/^https?:\/\//, "")
    const newQuickLinks = {
      bs1: cleanUrl,
      bs2: cleanUrl,
      bs3: cleanUrl,
      bs4: cleanUrl,
      bs5: cleanUrl,
      bs6: cleanUrl,
      bs7: cleanUrl,
      bs8: cleanUrl,
    }
    setQuickLinks(newQuickLinks)
    
    // Отправляем цель генерации быстрых ссылок
    sendYandexMetrikaGoal("quick_links_generated", {
      quick_links_count: Object.keys(newQuickLinks).length,
      base_domain: cleanUrl
    })
    
    toast({
      title: "Быстрые ссылки сгенерированы!",
      description: "Автоматически созданы ссылки с базовым URL",
      duration: 2000,
    })
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">UTM Конструктор для Яндекс Директ</h1>
          <p className="text-gray-600 text-lg">Генератор UTM-меток для рекламных кампаний</p>
          <p className="text-sm text-gray-500 mt-2">Создавайте профессиональные UTM-метки для эффективного отслеживания рекламных кампаний</p>
        </header>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Настройки кампании
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-transparent"
                    onClick={() => {
                      if (typeof window !== "undefined" && window.ym) {
                        window.ym(103772260, "reachGoal", "template_viewed")
                      }
                    }}
                  >
                    <Info className="w-4 h-4" />
                    Шаблон UTM-меток
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Шаблон UTM-меток</DialogTitle>
                    <DialogDescription>Формат расширенных UTM-параметров для Яндекс Директа</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <code className="text-sm text-gray-700 break-all block font-mono leading-relaxed">
                        {"?utm_source=yandex&utm_medium=source_type:{source_type}|place:{source}"}
                        <br />
                        {"&utm_campaign=campaign_name_{campaign_id}&utm_term=keyword:{keyword}"}
                        <br />
                        {"|retargeting_id:{retargeting_id}|key_id:{phrase_id}"}
                        <br />
                        {"&utm_content=gbid:{gbid}|creative_id:{creative_id}|ad_id:{ad_id}|banner_id:{banner_id}"}
                        <br />
                        {"|addphrases:{addphrases}|match_type:{match_type}|matched_keyword:{matched_keyword}"}
                        <br />
                        {"|coef_goal:{coef_goal_context_id}|device:{device_type}|device_id:{device_id}"}
                        <br />
                        {"|position_type:{position_type}|position:{position}|blok:{blok}"}
                      </code>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Описание UTM-параметров</h3>

                      <div className="grid gap-4">
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">Основные UTM-метки</h4>
                          <div className="space-y-3 text-sm">
                            <div>
                              <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">utm_source</span>
                              <span className="ml-2 text-gray-700">
                                Источник перехода или рекламная платформа (обязательный)
                              </span>
                              <div className="text-xs text-gray-500 mt-1">
                                Пример: yandex — объявления размещаются в Директе
                              </div>
                            </div>
                            <div>
                              <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">utm_medium</span>
                              <span className="ml-2 text-gray-700">Тип рекламы (обязательный)</span>
                              <div className="text-xs text-gray-500 mt-1">
                                Пример: cpc, search — контекстная реклама; display — медийная реклама
                              </div>
                            </div>
                            <div>
                              <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">utm_campaign</span>
                              <span className="ml-2 text-gray-700">Название рекламной кампании (обязательный)</span>
                              <div className="text-xs text-gray-500 mt-1">
                                {"Пример: polet_v_kosmos или campaign_name_{campaign_id}"}
                              </div>
                            </div>
                            <div>
                              <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">utm_term</span>
                              <span className="ml-2 text-gray-700">Ключевая фраза (необязательный)</span>
                              <div className="text-xs text-gray-500 mt-1">{"Пример: {keyword}"}</div>
                            </div>
                            <div>
                              <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">utm_content</span>
                              <span className="ml-2 text-gray-700">
                                Дополнительная информация для различения объявлений (необязательный)
                              </span>
                              <div className="text-xs text-gray-500 mt-1">
                                {'Можно использовать несколько значений через "|"'}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">Динамические параметры Яндекс Директа</h4>
                          <div className="grid md:grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="font-mono bg-blue-50 px-2 py-1 rounded text-xs">{"{campaign_id}"}</span>
                              <div className="text-xs text-gray-600 mt-1">Идентификатор рекламной кампании</div>
                            </div>
                            <div>
                              <span className="font-mono bg-blue-50 px-2 py-1 rounded text-xs">{"{keyword}"}</span>
                              <div className="text-xs text-gray-600 mt-1">Ключевая фраза показа объявления</div>
                            </div>
                            <div>
                              <span className="font-mono bg-blue-50 px-2 py-1 rounded text-xs">{"{source_type}"}</span>
                              <div className="text-xs text-gray-600 mt-1">search — поиск; context — сети</div>
                            </div>
                            <div>
                              <span className="font-mono bg-blue-50 px-2 py-1 rounded text-xs">{"{source}"}</span>
                              <div className="text-xs text-gray-600 mt-1">Домен площадки или none для поиска</div>
                            </div>
                            <div>
                              <span className="font-mono bg-blue-50 px-2 py-1 rounded text-xs">
                                {"{position_type}"}
                              </span>
                              <div className="text-xs text-gray-600 mt-1">premium, dynamic_places, other, none</div>
                            </div>
                            <div>
                              <span className="font-mono bg-blue-50 px-2 py-1 rounded text-xs">{"{position}"}</span>
                              <div className="text-xs text-gray-600 mt-1">Точная позиция объявления в блоке</div>
                            </div>
                            <div>
                              <span className="font-mono bg-blue-50 px-2 py-1 rounded text-xs">{"{device_type}"}</span>
                              <div className="text-xs text-gray-600 mt-1">desktop, mobile, tablet</div>
                            </div>
                            <div>
                              <span className="font-mono bg-blue-50 px-2 py-1 rounded text-xs">{"{ad_id}"}</span>
                              <div className="text-xs text-gray-600 mt-1">Идентификатор объявления</div>
                            </div>
                            <div>
                              <span className="font-mono bg-blue-50 px-2 py-1 rounded text-xs">{"{gbid}"}</span>
                              <div className="text-xs text-gray-600 mt-1">Идентификатор группы объявлений</div>
                            </div>
                            <div>
                              <span className="font-mono bg-blue-50 px-2 py-1 rounded text-xs">{"{phrase_id}"}</span>
                              <div className="text-xs text-gray-600 mt-1">Идентификатор ключевой фразы</div>
                            </div>
                            <div>
                              <span className="font-mono bg-blue-50 px-2 py-1 rounded text-xs">
                                {"{retargeting_id}"}
                              </span>
                              <div className="text-xs text-gray-600 mt-1">ID условия ретаргетинга</div>
                            </div>
                            <div>
                              <span className="font-mono bg-blue-50 px-2 py-1 rounded text-xs">{"{match_type}"}</span>
                              <div className="text-xs text-gray-600 mt-1">rm — автотаргетинг; syn — семантика</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800 font-medium mb-2">Важные замечания:</p>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>{"• Фигурные скобки {параметр} остаются как есть в итоговых ссылках"}</li>
                        <li>• campaign_name заменяется на ваше название кампании</li>
                        <li>• Все параметры передаются в Яндекс Директ для детальной аналитики</li>
                        <li>• Используйте латиницу в значениях, разделяйте слова подчеркиваниями или дефисами</li>
                        <li>• Обязательные UTM-параметры: utm_source, utm_medium, utm_campaign</li>
                      </ul>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="baseUrl">Адрес вашей страницы *</Label>
              <div className="flex gap-2">
                <Select value={protocol} onValueChange={setProtocol}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="https://">https://</SelectItem>
                    <SelectItem value="http://">http://</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="baseUrl"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="example.com"
                  required
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullCampaignName">Полное название кампании</Label>
              <Input
                id="fullCampaignName"
                value={fullCampaignName}
                onChange={(e) => setFullCampaignName(e.target.value)}
                placeholder="Поиск | РФ | Бренды | НБ 52 | oCPA Покупка: 6000..."
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Система возьмет первые 3 части (разделенные "|") и переведет в латиницу
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="campaignName">Название кампании (name) *</Label>
              <Input
                id="campaignName"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="poisk-rf-brendy"
                required
                className="w-full"
              />
            </div>

            <Collapsible open={quickLinksOpen} onOpenChange={setQuickLinksOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-between bg-transparent">
                  Быстрые ссылки (необязательно)
                  <ChevronDown className={`h-4 w-4 transition-transform ${quickLinksOpen ? "rotate-180" : ""}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 mt-4">
                <p className="text-sm text-gray-600">
                  Настройте быстрые ссылки или оставьте пустыми для автоматического использования основного адреса
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(quickLinks).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <Label htmlFor={key}>{key.toUpperCase()}</Label>
                      <Input
                        id={key}
                        value={value}
                        onChange={(e) => setQuickLinks((prev) => ({ ...prev, [key]: e.target.value }))}
                        placeholder={baseUrl ? `${baseUrl.replace(/^https?:\/\//, "")}/${key}` : `example.com/${key}`}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  Если поле пустое, будет использован основной адрес страницы. Можете дополнить URL для конкретных
                  страниц (например, brands/the-row).
                </p>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        {campaignName && baseUrl && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Сгенерированные ссылки
                <Button
                  onClick={() => {
                    if (typeof window !== "undefined" && window.ym) {
                      window.ym(103772260, "reachGoal", "utm_generated")
                    }
                    copyAllLinks()
                  }}
                  variant="outline"
                  size="sm"
                  className={`gap-2 transition-colors ${
                    copiedStates["copy-all"] ? "bg-green-100 text-green-700 border-green-300" : "hover:bg-gray-50"
                  }`}
                >
                  {copiedStates["copy-all"] ? (
                    <>
                      <Check className="w-4 h-4" />
                      Скопировано!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Скопировать все
                    </>
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Основная ссылка (заголовок):</Label>
                <div className="flex gap-2 items-start">
                  <code className="flex-1 p-3 bg-gray-100 rounded text-sm font-mono break-all">
                    {generateUTMLink(baseUrl, campaignName, "zagolovok")}
                  </code>
                  <Button
                    onClick={() => copyToClipboard(generateUTMLink(baseUrl, campaignName, "zagolovok"), "main")}
                    variant="outline"
                    size="sm"
                    className={`shrink-0 transition-colors ${
                      copiedStates["main"] ? "bg-green-100 text-green-700 border-green-300" : "hover:bg-gray-50"
                    }`}
                  >
                    {copiedStates["main"] ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {Object.entries(quickLinks).some(([_, url]) => url.trim()) && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Быстрые ссылки:</Label>
                  {Object.entries(quickLinks)
                    .filter(([_, url]) => url.trim())
                    .map(([key, url]) => {
                      const finalUrl = url.trim() || baseUrl
                      const generatedLink = generateUTMLink(finalUrl, campaignName, key)
                      return (
                        <div key={key} className="space-y-1">
                          <Label className="text-xs text-gray-600">{key.toUpperCase()}:</Label>
                          <div className="flex gap-2 items-start">
                            <code className="flex-1 p-3 bg-gray-100 rounded text-sm font-mono break-all">
                              {generatedLink}
                            </code>
                            <Button
                              onClick={() => copyToClipboard(generatedLink, key)}
                              variant="outline"
                              size="sm"
                              className={`shrink-0 transition-colors ${
                                copiedStates[key] ? "bg-green-100 text-green-700 border-green-300" : "hover:bg-gray-50"
                              }`}
                            >
                              {copiedStates[key] ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}

export default Page
