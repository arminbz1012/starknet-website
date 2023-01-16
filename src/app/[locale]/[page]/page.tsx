import { notFound } from "next/navigation";
import { getMessages } from "src/data/i18n/intl";
import { getPageByFilename } from "src/data/pages";

export interface Props {
  readonly params: LocaleParams & {
    readonly page: string;
  };
}

export default async function Page({
  params: { locale, page },
}: Props): Promise<JSX.Element> {
  try {
    const messages = await getMessages(locale);
    const { title, MDXContent } = await getPageByFilename(page, locale);

    return (
      <div className="mx-auto  max-w-7xl px-2 sm:px-4 lg:px-8 pt-7">
        <div className="prose">
          <h2>{title}</h2>
          <MDXContent />
        </div>

        <div>Content nav {messages.search}</div>
      </div>
    );
  } catch (err) {
    console.log(err);
    notFound();
  }
}
