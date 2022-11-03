const SocialsLink = ({ user, socials }) => (
    <div className="mt-3 flex items-center justify-start gap-2">
        {user.links && user.links.length
            ? user.links.map((link, i) => (
                  <a
                      href={link.full_url}
                      key={i}
                      target="_blank"
                      rel="noopener"
                      className={`bg-shark-200/60 flex h-8 w-10 items-center justify-center rounded-lg ${
                          socials[link.name]
                              ? socials[link.name].class
                              : socials["website"].class
                      }  dark:border-shark-600 dark:bg-shark-900`}
                  >
                      {socials[link.name]
                          ? socials[link.name].icon
                          : socials["website"].icon}
                  </a>
              ))
            : null}
    </div>
);

export default SocialsLink;
