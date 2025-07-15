// This is a mock ORM (inspired by Prisma's API) used to simplify
// parts of the app not relevant to the demo. It is not intended
// as a learning resource or example of best practices.

import 'server-only';

// Removed broken import and related types
// This file appears to be unused in the chanda calculator functionality

type ProductWhere = { id?: string; category?: string; section?: string };

type ProductFindOptions = { where?: ProductWhere; limit?: number };

type SectionWhere = { id?: string; slug?: string };

type SectionFindOptions = { where?: SectionWhere; limit?: number };

const db = {
  product: {
    find: (options: ProductFindOptions) => {
      let product: any;

      if (options.where?.id !== undefined) {
        product = data.products.find((p) => p.id === options.where?.id);
      } else if (options.where?.category !== undefined) {
        product = data.products.find(
          (p) => p.category === options.where?.category,
        );
      }

      let prev: string | undefined = undefined;
      let next: string | undefined = undefined;

      if (product) {
        const ids = data.products.map((p) => Number(p.id));
        const currentIndex = ids.indexOf(Number(product.id));
        const prevIndex = (currentIndex - 1 + ids.length) % ids.length;
        const nextIndex = (currentIndex + 1) % ids.length;

        prev = data.products[prevIndex]?.id;
        next = data.products[nextIndex]?.id;
      }

      return product ? { ...product, prev, next } : null;
    },
    findMany: (options: ProductFindOptions = {}) => {
      let result = data.products;

      if (options.where?.category) {
        result = result.filter(
          (product) => product.category === options.where!.category,
        );
      }

      if (options.where?.section) {
        const sectionCategories = data.categories
          .filter((category) => category.section === options.where!.section)
          .map((category) => category.id);
        result = result.filter((product) =>
          sectionCategories.includes(product.category),
        );
      }

      if (options.limit !== undefined) {
        result = result.slice(0, options.limit);
      }

      return result;
    },
  },
  section: {
    find: (options: SectionFindOptions) => {
      let section: any;

      if (options.where?.id !== undefined) {
        section = data.sections.find((s) => s.id === options.where?.id);
      } else if (options.where?.slug !== undefined) {
        section = data.sections.find((s) => s.slug === options.where?.slug);
      }

      return section || null;
    },
    findMany: (options: SectionFindOptions = {}) => {
      let result = data.sections;

      if (options.where?.id) {
        result = result.filter((section) => section.id === options.where!.id);
      }

      if (options.where?.slug) {
        result = result.filter(
          (section) => section.slug === options.where!.slug,
        );
      }

      if (options.limit !== undefined) {
        result = result.slice(0, options.limit);
      }

      return result;
    },
  },
};

export default db;
