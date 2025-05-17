'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'

export default function FAQsTwo() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'How long does Notifications take?',
            answer: 'Notifications are Instant and take no time because of services like clelery which are working on python programming language',
        },
        {
            id: 'item-2',
            question: 'What payment methods do you accept?',
            answer: 'The application is completely free to use and open source and you can find the GitHub Repository as well... ',
        },
        {
            id: 'item-3',
            question: 'Can I change or cancel my subscriptions?',
            answer: 'You can change , modify or cancel your subscriptions any time you want to and you just need to update your subscriptions information over here and then we will manage your whole subscription expenses accordingly.',
        },
        {
            id: 'item-4',
            question: 'Do you work internationally?',
            answer: "Yes, any kind of platform wheter it is NetFlix, HuLu, AmaZon Originals, Apple TV+ Or Etc.. We Manage Everything All At One Place...",
        }
    ]

    return (
        <section className="py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="mx-auto max-w-xl text-center">
                    <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground mt-4 text-balance">Discover quick and comprehensive answers to common questions about our platform, services, and features.</p>
                </div>

                <div className="mx-auto mt-12 max-w-xl">
                    <Accordion
                        type="single"
                        collapsible
                        className="bg-card ring-muted w-full rounded-2xl border px-8 py-3 shadow-sm ring-4 dark:ring-0">
                        {faqItems.map((item) => (
                            <AccordionItem
                                key={item.id}
                                value={item.id}
                                className="border-dashed">
                                <AccordionTrigger className="cursor-pointer text-base hover:no-underline">{item.question}</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-base">{item.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <p className="text-muted-foreground mt-6 px-8">
                        Can't find what you're looking for? Contact our{' '}
                        <Link
                            href="#"
                            className="text-primary font-medium hover:underline">
                            customer support team
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}
