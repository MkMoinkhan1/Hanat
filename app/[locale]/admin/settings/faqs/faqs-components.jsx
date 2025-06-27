"use client";

import MainButton from "@/components/main_button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function FAQsComponent() {
  const t = useTranslations("Faqs")
  const [faqs, setFaqs] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [editingFaq, setEditingFaq] = useState(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");

  const handleAddFaq = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      const newFaq = {
        id: Date.now(),
        question: newQuestion.trim(),
        answer: newAnswer.trim(),
      };
      setFaqs([...faqs, newFaq]);
      setNewQuestion("");
      setNewAnswer("");
    }
  };

  const handleEditFaq = (faq) => {
    setEditingFaq(faq.id);
    setEditQuestion(faq.question);
    setEditAnswer(faq.answer);
  };

  const handleSaveEdit = () => {
    if (editingFaq && editQuestion.trim() && editAnswer.trim()) {
      setFaqs(
        faqs.map((faq) =>
          faq.id === editingFaq
            ? {
                ...faq,
                question: editQuestion.trim(),
                answer: editAnswer.trim(),
              }
            : faq
        )
      );
      setEditingFaq(null);
      setEditQuestion("");
      setEditAnswer("");
    }
  };

  const handleCancelEdit = () => {
    setEditingFaq(null);
    setEditQuestion("");
    setEditAnswer("");
  };

  const handleDeleteFaq = (id) => {
    setFaqs(faqs.filter((faq) => faq.id !== id));
  };

  return (
    <div className="space-y-6 p-6">
      <MainButton />
      <div className="flex items-center justify-between">
        <h3 className="2xl:text-lg text-sm font-medium">
          {t('title')}
        </h3>
        <Button
          className="bg-slate-900 hover:bg-slate-800 gap-2"
          onClick={handleAddFaq}
          disabled={!newQuestion.trim() || !newAnswer.trim()}
        >
          <Plus className="h-4 w-4" />
          {t('add_new_faq')}
        </Button>
      </div>

      {/* Add New FAQ Form */}
      <div className="space-y-4 p-6 border rounded-lg bg-muted/20">
        <h4 className="font-medium 2xl:text-sm text-xs"> {t('add_new_faq')}</h4>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="2xl:text-sm text-xs font-medium">
              {t('enter_question')}
            </label>
            <Input
              placeholder={t('placeholder.question')}
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="2xl:text-sm text-xs"
            />
          </div>
          <div className="space-y-2">
            <label className="2xl:text-sm text-xs font-medium">
              {t('enter_answer')}
            </label>
            <Textarea
              placeholder={t('placeholder.answer')}
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              className="min-h-[100px] 2xl:text-sm text-xs"
            />
          </div>
          <Button
            onClick={handleAddFaq}
            disabled={!newQuestion.trim() || !newAnswer.trim()}
            className="bg-slate-900 hover:bg-slate-800 2xl:text-sm text-xs"
          >
            {t('add_faq_button')}
          </Button>
        </div>
      </div>

      {/* FAQ List */}
      {faqs.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium 2xl:text-sm text-xs">{t('faq_list')}</h4>
          {faqs.map((faq, index) => (
            <div key={faq.id} className="p-6 border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h5 className="font-medium">{t('new_faq')}</h5>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditFaq(faq)}
                    disabled={editingFaq === faq.id}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteFaq(faq.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {editingFaq === faq.id ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="2xl:text-sm text-xs font-medium">
                      {t('enter_question')}
                    </label>
                    <Input
                      value={editQuestion}
                      onChange={(e) => setEditQuestion(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="2xl:text-sm text-xs font-medium">
                      {t('enter_answer')}
                    </label>
                    <Textarea
                      value={editAnswer}
                      onChange={(e) => setEditAnswer(e.target.value)}
                      className="min-h-[100px] 2xl:text-sm text-xs"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleSaveEdit}
                      disabled={!editQuestion.trim() || !editAnswer.trim()}
                      size="sm"
                      className="bg-slate-900 hover:bg-slate-800 2xl:text-sm text-xs"
                    >
                      {t('save')}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCancelEdit}
                      size="sm"
                      className="2xl:text-sm text-xs"
                    >
                      {t('cancel')}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="2xl:text-sm text-xs font-medium">
                      {t('question_label')}
                    </label>
                    <div className="p-3 bg-muted/50 rounded-md 2xl:text-sm text-xs">
                      {faq.question}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="2xl:text-sm text-xs font-medium">
                        {t('answer_label')}
                    </label>
                    <div className="p-3 bg-muted/50 rounded-md 2xl:text-sm text-xs">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
